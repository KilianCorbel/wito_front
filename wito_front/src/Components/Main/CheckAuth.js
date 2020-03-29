
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    //smargin: theme.spacing(5),
  },
  paper: {
    //padding: theme.spacing(2),
  },
  row: {
    margin: 0,
  },
  card: {
  },
  media: {
    height: 140,
  },
  typo: {
    textAlign: 'left',
    //paddingLeft: theme.spacing(2),
  },
  name: {
    textAlign: 'right',
  },
  fab: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'start',

  },
  formControl: {
    //marginTop: theme.spacing(1),
    display: 'flex',
    minWidth: 120,
  }
});

class CheckAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getCours : [],
            open : false,
            display : false,
            fullWidth : true,
            maxWidth : 'sm',
            values : {
              promo: '',
            },
            selectedDate : new Date(),
            selectedTimeS : new Date(),
            selectedTimeE : new Date()
        }
    }

    handleIdentificationDisplay = () => {
        this.setState({display : true});
    };
    
    handleIdentificationClose = () => {
        this.setState({display : false});
    };  

    submitConnexion(event) {
        event.preventDefault();
    
        let utilisateur = {
          mail : document.getElementById('email').value,
          mdp : document.getElementById('password').value
        }
        console.log("utilisateur: " + JSON.stringify(utilisateur));
    
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/auth',{
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

            } else {
              localStorage.setItem('user_id', data.id); 
              localStorage.setItem('user_token', data.token);
              localStorage.setItem('user_role', data.role);

              if (data.role === "inscrit") {
                window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/accesrefuse');
              } else {
                window.location.reload();
              } 
            }
        });
      }

    componentDidMount() {
        let currentComponent = this;
        console.log(localStorage.getItem('user_role'));
        if(localStorage.getItem('user_role') == null || (localStorage.getItem('user_role') != "etudiant" && localStorage.getItem('user_role') != "professeur" && localStorage.getItem('user_role') != "administrateur" && localStorage.getItem('user_role') != "inscrit")) {
            this.handleIdentificationDisplay();
          } else {
            this.handleIdentificationClose();
            if(localStorage.getItem('user_role') === "inscrit") {
              window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/accesrefuse');
            }
            // if(localStorage.getItem('user_role') === "etudiant") {
            //   fetch(window.location.protocol + '//' + window.location.hostname + ':3010/etudiants/'+ localStorage.getItem('user_id') ) 
            //     .then((resp) => resp.json())
            //     .then(function(etudiant) {
            //       console.log(etudiant);
            //       console.log("classe");
            //       console.log(etudiant.classe);
            //       currentComponent.setState({etudiant : etudiant});
            //     })
            // }
          }
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                fullWidth={this.state.fullWidth}
                maxWidth={this.state.maxWidth}
                open={this.state.display}
                aria-labelledby="max-width-dialog-title">
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
        )
    }
}

export default withStyles(styles)(CheckAuth);