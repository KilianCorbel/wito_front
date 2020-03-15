import React, { Component } from 'react';
import CheckAuth from '../Main/CheckAuth';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
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
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    root: {
      flexGrow: 1,
      //smargin: theme.spacing(5),
    },
    card: {
        margin: '0 auto',
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
      },
      avatar: {
        width: '10vh',
        height: '10vh',
      },
      top: {
        marginTop: '8vh',
      },
      role: {
        textAlign: 'left',
        marginTop: '5px',
      }
});

class MonCompte extends Component {
  constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
          value: '',
          setValue: '',
          user: '',
          open : false,
      }
  }

  componentDidMount() {
      let currentComponent = this;

      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/' + localStorage.getItem("user_id"))
      .then((resp) => resp.json())
      .then(function(user) {
          console.log(user);
          currentComponent.setState(user);
      })
  }

  handleChange = (event, newValue) => {
    this.setState({setValue : newValue});
  };

  handleChangeIndex = (index) => {
    this.setState({setValue : index});
  };

  handleClickOpen = () => {
    this.setState({open : true});
  };
  
  handleClose = () => {
    this.setState({open : false});
    window.location.reload();
  };

  handleSubmit(event) {
    let currentComponent = this;
    let mdp = document.getElementById('mdp').value;
    let confmdp = document.getElementById('confmdp').value;

    console.log(mdp);
    console.log(confmdp);
    if (mdp === confmdp) {
      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/' + localStorage.getItem('user_id'),{
          method: 'PUT',
          body: JSON.stringify({
            mdp: mdp,
        })
      });
      this.handleClose();
    }
  }

  render() {
    const {classes} = this.props;
    const user = this.state;

    return (
        <div className={classes.root}>
            <CheckAuth/>

            <Grid spacing={3} className={classes.top}>
                <Grid item md={3}></Grid>
                  
                <Grid container xs={12} md={6}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8}>
                  <Card className={classes.card} >
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={4}>
                              <Avatar alt="" className={classes.avatar} src="./src\account.png" />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid item xs={12} >
                                <Typography gutterBottom className={classes.role} variant="h5" component="h2">
                                  {user.nom} {user.prenom}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} >
                                <Typography variant="body2" color="textSecondary" className={classes.role} component="h2">
                                  {user.mail} 
                                </Typography>
                              </Grid>
                              <Grid item xs={12} >
                                <Typography variant="body2" color="textSecondary" className={classes.role} component="h2">
                                  {user.role} 
                                </Typography>
                              </Grid>
                              </Grid>
                            <Grid item xs={3}>
                              
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={4}>
                              
                            </Grid>
                            <Grid item xs={8}>
                            <Button variant="contained" onClick={this.handleClickOpen} color="secondary">
                                Modifier le mot de passe
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid item md={3}></Grid>
            </Grid>

            <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.open}
            onClose={this.state.handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            
          <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <DialogTitle>Modifier le mot de passe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="mdp"
                        label="Nouveau mot de passe"
                        type="mdp"
                        fullWidth
                      />
                    </Grid>                  
                    
                                   
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <TextField
                          
                          margin="dense"
                          id="confmdp"
                          label="Confirmez le mot de passe"
                          type="confmdp"
                          fullWidth
                        />
                    </Grid>  
                  </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSubmit} color="primary">
                Modifier le mot de passe
              </Button>
              <Button onClick={this.handleClose} color="secondary">
                Fermer
              </Button>
            </DialogActions>
          </FormControl>
          </form>
          </Dialog>
        </div>
      );
  }
  
}

export default withStyles(styles)(MonCompte);