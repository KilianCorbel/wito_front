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
    //margin: theme.spacing(3, 0, 2),
  }
});

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {

    }
  }

  componentDidMount() {
    let currentComponent = this;

  }

  handleSubmit(event) {
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
              
                //window.location.replace("/");
              } else {
                localStorage.setItem('user_id', data.id); 
                localStorage.setItem('user_token', data.token);
                localStorage.setItem('user_role', data.role);
                window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/cours');
              }
          });
        } else {
          localStorage.setItem('user_id', data.id); 
          localStorage.setItem('user_token', data.token);
          localStorage.setItem('user_role', data.role);
          window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/cours');
        }
    });
  }

  render(){
    const { classes } = this.props;

    

    return (
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar alt="wito logo" src="https://i.imgur.com/smwWWgt.png" className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <form className={classes.form} noValidate>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                className={classes.submit}
              >
                Connexion
              </Button>
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
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>  
        </Container>
      </div>
    );
  }
}

Connexion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Connexion);