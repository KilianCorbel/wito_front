import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NavBar from '../Navbar/Menu';
import CheckAuth from '../Main/CheckAuth';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://wito.com/">
        Wito
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Menu() {
  return (
    <NavBar />
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: "#FFF",
    },
  },
  paper: {
    marginTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin:'10px'
  },
  card: {
    width: '100%',
  },
  avatar: {
    objectFit: "fill",
    height:100,
    width: 100,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
    marginTop: '10px'
  },
  submit: {
    marginTop: '20px',
    marginBottom: '10px'
    //margin: theme.spacing(3, 0, 2),
  },
  recap: {
    marginBottom:'20px'
  },
  typo: {
    textAlign: 'center',
    margin: '5px',
    //paddingLeft: theme.spacing(2),
  },
  typoHead: {
    textAlign: 'center',
    marginBottom: '15px'
  },
  typoBig: {
    textAlign: 'center',
    marginTop: '15px'
  }
});

class Signature extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      cours : '',
      professeur : '',
      etudiant : '',
      display : false
    }
  }
  
  componentDidMount() {
    let currentComponent = this;

    // C'est un peu dégueu mais ça marche pour l'instant
    const location = this.props.location.pathname;
    const idCours= location.substr(11,25);

    fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/'+ idCours ) 
      .then((resp) => resp.json())
      .then(function(cours) {
        currentComponent.setState({professeur: cours.professeur.utilisateur});
        currentComponent.setState({cours : cours});
      })

      console.log(localStorage.getItem('user_role'));
      console.log(localStorage.getItem('user_id'));
    if(localStorage.getItem('user_role') == "etudiant") {
      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/'+ localStorage.getItem('user_id') ) 
        .then((resp) => resp.json())
        .then(function(etudiant) {
          console.log(etudiant);
          currentComponent.setState({etudiant : etudiant});
        });
    }
  }

  submitConnexion(event) {
    event.preventDefault();

    let utilisateur = {
      mail : document.getElementById('email').value,
      mdp : document.getElementById('password').value
    }
    console.log("utilisateur: " + JSON.stringify(utilisateur));

    fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/auth',{
        method: 'POST',
        body: JSON.stringify({
            mail : utilisateur.mail,
            mdp : utilisateur.mdp,
    }),
    headers: {"Content-Type": "application/json"}
    })
    .then((resp) => resp.json())
    .then(function(data) {
        console.log("data - " + data.text);

        if(data.text === "Erreur"){
          console.log("data - " + data.text);
          fetch(window.location.protocol + '//' + window.location.hostname + ':3010/etudiants/auth',{
              method: 'POST',
              body: JSON.stringify({
                  mail : utilisateur.mail,
                  mdp : utilisateur.mdp,
          }),
          headers: {"Content-Type": "application/json"}
          })
          .then((resp) => resp.json())
          .then(function(data) {
              console.log("data - " + data.text);

              if(data.text === "Erreur"){
                console.log("data - " + data.text);
              } else {
                localStorage.setItem('user_id', data.id); 
                localStorage.setItem('user_token', data.token);
                localStorage.setItem('user_role', data.role);
                window.location.reload();
              }
          });
        } else {
          localStorage.setItem('user_id', data.id); 
          localStorage.setItem('user_token', data.token);
          localStorage.setItem('user_role', data.role);
          window.location.reload();
        }
    });
  }

  handleIdentificationDisplay = () => {
    this.setState({display : true});
  };

  handleIdentificationClose = () => {
    this.setState({display : false});
  };

  handleSubmit(event) {
    event.preventDefault();

    let currentComponent = this;

    var b = '';

    if(localStorage.getItem('user_role') == "Etudiant") {
      b = JSON.stringify({
        idEtudiant: currentComponent.state.etudiant._id,
        presents : currentComponent.state.presents
      })
    } else {
      b = JSON.stringify({
        nomdEtudiant: currentComponent.state.nom,
        prenomEtudiant : currentComponent.state.prenom,
        presentsProvisoire : currentComponent.state.presentsProvisoire
      })
    }

    fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/present/' + currentComponent.state.cours._id + '/' + localStorage.getItem('user_role'),{
        method: 'POST',
        body: b,
        headers: {"Content-Type": "application/json"}
    })
    .then(function(response){
        console.log(response => response.json());
        return response => response.json()
    })
    
    window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/feuilleAppel/' + this.state.cours._id);
  }

  render(){
    const { classes } = this.props;
    const {cours} = this.state;
    const {professeur} = this.state;
    const {etudiant} = this.state;

    return (
      
      <div className={classes.root}>
        <Menu />
        <CheckAuth />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar alt="wito logo" src="https://i.imgur.com/smwWWgt.png" className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.recap}>
              Récapitulatif
            </Typography>
            <Grid md={12} xs={12}>
              <Card className={classes.card} >
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid md={12} xs={12}>
                        <Typography gutterBottom className={classes.typoHead} variant="h5" component="h3" >
                          Présence au cours {cours.nom}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container >
                      <Grid  md={12} xs={12}>
                        <Typography variant="body2" color="textSecondary" className={classes.typo}>
                           Assuré par {professeur.prenom} {professeur.nom} 
                        </Typography>
                      </Grid>
                      <Grid md={12} xs={12}>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          Le {cours.date}
                        </Typography>
                      </Grid>
                      
                    </Grid>
                    <Grid container >
                      <Grid  md={12} xs={12}>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          {cours.heureD} - {cours.heureF}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid md={12} xs={12} offset>
                        <Typography gutterBottom className={classes.typoBig} variant="h5" component="h3">
                          {etudiant.prenom} {etudiant.nom} assure sa présence
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
              </Card>
            </Grid>
            {/* <Grid item xs={10}>
                  <Typography component="h3">
                    {this.state.cours.nom}
                  </Typography>
                  <Typography component="h5">
                    Cours du {this.state.cours.date}
                  </Typography>
                  <Typography>
                    {this.state.cours.heureD} - {this.state.cours.heureF}
                  </Typography>
            </Grid>
            <Grid item xs={10}>
                  <Typography component="h2">
                    Nom: {this.state.nom}
                  </Typography>
                  <Typography component="h2">
                    Prenom: {this.state.prenom}
                  </Typography>
            </Grid> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                className={classes.submit}
              >
                Signer
              </Button>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>  
        </Container>

        <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.display}
            aria-labelledby="max-width-dialog-title"
          >
            
          <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <DialogContent>
              <DialogContentText>
                <Container component="main" maxWidth="xs">
                  <center>
                    <Avatar alt="wito logo" src="https://i.imgur.com/smwWWgt.png" className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Connexion
                    </Typography>
                  </center>
                  <br />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Se souvenir de moi."
                  />
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Mot de passe oublié ?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Pas de compte ? S'inscrire."}
                      </Link>
                    </Grid>
                  </Grid>
                </Container>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.submitConnexion} color="primary">
                Connexion
              </Button>
            </DialogActions>
          </FormControl>
          </form>
        </Dialog>
      </div>
    );
  }
}

Signature.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signature);