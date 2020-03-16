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
import PanToolIcon from '@material-ui/icons/PanTool';


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
        height: '15vh',
      },
      access: {
        marginTop: '3vh',
        textAlign: 'left',
        color: '#757575',
      },
      denied: {
        textAlign: 'left',
        color: '#757575',
      },
      icon: {
          fontSize: 120,
      }
});

class MonCompte extends Component {
  constructor(props){
      super(props);
      this.state = {
          value: '',
          setValue: '',
          user: '',
          open : false,
      }
  }

  componentDidMount() {
      let currentComponent = this;
  }

  render() {
    const {classes} = this.props;
    const user = this.state;

    return (
        <div className={classes.root}>

            <Grid spacing={3} >
                <Grid item md={2}></Grid>
                  
                <Grid container xs={12} md={8} className={classes.top}>
                  <Grid item xs={4} md={4}>
                      <PanToolIcon className={classes.icon} color="action"/>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid container xs={7} md={7}>
                      <Grid item xs={10}>
                        <Typography gutterBottom className={classes.access} variant="h5" component="div">
                            Accès refusé
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography gutterBottom className={classes.denied} variant="h5" component="div">
                            En attente de validation de l'étudiant.
                        </Typography>
                      </Grid>
                    
                  </Grid>
                </Grid>

                <Grid item md={2}></Grid>
            </Grid>
        </div>
      );
  }
  
}

export default withStyles(styles)(MonCompte);