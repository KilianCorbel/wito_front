import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    objectFit: "fill",
    height:100,
    width: 100,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    let submit = function (){
      let utilisateur = {
        nom : document.getElementById('firstName').value,
        prenom : document.getElementById('lastName').value,
        mail : document.getElementById('email').value,
        mdp : document.getElementById('password').value
      }
      console.log("utilisateur: " + JSON.stringify(utilisateur));

      let url = "professeur";
      
      console.log("AAAAAAAAAAAA: " + document.getElementById('isStudent').checked);
      if(document.getElementById('isStudent').checked) {
        url = "etudiant";
      }
      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/' + url + 's/',{
            method: 'POST',
            body: JSON.stringify({
                nom: utilisateur.nom,
                prenom : utilisateur.prenom,
                mail : utilisateur.mail,
                mdp : utilisateur.mdp,
        }),
        headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
            console.log(response => response.json());
            return response => response.json()
        })
    }

    const classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar alt="wito logo" src="https://i.imgur.com/smwWWgt.png" className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <form className={classes.form} action='/' noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Adresse mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox id="isStudent" value="allowExtraEmails" color="primary" />}
                  label="Je suis étudiant."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submit}
              className={classes.submit}
            >
              Inscription
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Déjà un compte ? Connectez-vous.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
}
