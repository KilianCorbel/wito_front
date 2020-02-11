import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { QRCode } from 'react-qr-svg';
import Navbar from '../Navbar/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { withStyles } from '@material-ui/styles';
import CheckAuth from '../Main/CheckAuth';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: '2vh',
    },
    paper: {
      padding: '2vh',
      textAlign: 'center',
    },
    cours: {
      padding: "2vh",
    },
    qr: {
      textAlign: 'center',
      marginTop: '6vh',
      marginLeft: '5vh',
      marginRight: '5vh',
    },
    promo: {
      padding: "2vh",
      textAlign: 'center'
    },
    listPromo: {
      height: "2.5vh",
    },
    list: {
      marginTop: "20px"
    },
    titreCours: {
      fontSize: "14px"
    },
    qrcode: {
      width: 'auto',
    }
  });


class FeuilleAppel extends Component{
  constructor(props) {
    super(props);
    this.state = {
        idcours : '',
        getCours: '',
        cours : null,
        classe : null,
        etudiants: [],
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

  componentDidMount() {
    let currentComponent = this;

    console.log(window.location.origin + '/signature/'+ this.state.idcours);

    // C'est un peu dégueu mais ça marche pour l'instant
    const location = this.props.location.pathname;
    this.setState({idcours : location.substr(14,25)});

    fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/' + location.substr(14,25) ) 
      .then((resp) => resp.json())
      .then(function(cours) {
        console.log(cours);
        currentComponent.setState(cours);
        currentComponent.setState({getCours:cours});
        
        // let id = cours._id;
        // currentComponent.setState(id);

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/' + cours.classe)
          .then((resp) => resp.json())
          .then(function(classe) {
            console.log(classe);
            currentComponent.setState(classe);
          })

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/etudiants/classe/'+ cours.classe)
          .then((resp) => resp.json())
          .then(function(data) {
            var etudiants = [];

            data.forEach(function(etudiant) {
              etudiant.color = "secondary";

              cours.presents.some(function(present) {
                if(present._id === etudiant._id) {
                  etudiant.color = "primary";
                  return true;
                }
              });
              
              cours.presentsProvisoire.some(function(provisoire) {
                if(provisoire._id === etudiant._id) {
                  etudiant.color = "disabled";
                  return true;
                }
              });

              etudiants.push(etudiant);
            });

            console.log(etudiants);
            currentComponent.setState({etudiants});
          })
      })
  }

  render() {
    const {classes} = this.props;
    const cours = this.state;
    const classe = this.state;
    const {etudiants} = this.state;

/*     var presents = this.state.getCours.presents.map( (item, index) => {
      return (
        <Grid key={item._id} container spacing={3} className={classes.row}>

        </Grid>
      );
    }); */
    
    return (      
      <div>
        <div>
          <Navbar/>
          <CheckAuth />
        </div> 
        <div className={classes.root}>
          <Grid container >
            <Grid xs={12} md={4} xl={4}>
              <Paper className={classes.promo} elevation={0}>
                <Typography variant="h5" color="textSecondary">
                  Promotion {classe.label}
                </Typography>
                <List className={classes.list} aria-label="promotion">                  
                    {etudiants.map(etudiant =>
                      <ListItem key={etudiant._id} className={classes.listPromo} button>
                        <ListItemText  primary={etudiant.utilisateur.nom+' '+etudiant.utilisateur.prenom} />
                        <ListItemIcon>
                          {/* A Changer quand l'étudiant est marqué présent */}
                          
                          <CheckCircleOutlineIcon color={etudiant.color} />
                        </ListItemIcon>
                      </ListItem>
                    )}
                </List>
              </Paper>
            </Grid>

            <Grid xs={12} md={4} xl={4}>
              <Paper className={classes.qr} elevation={0}>
                <QRCode
                  level="Q"
                  className={classes.qrcode}
                   value={window.location.origin + '/signature/'+ this.state.idcours}
                />
              </Paper>
            </Grid>

            <Grid xs={12} md={4} xl={4}>
              <Paper elevation={0} className={classes.cours}>
                  <Typography className={classes.titreCours} color="textSecondary" gutterBottom>
                    Cours du {cours.date}
                  </Typography>
                  <Typography variant="h5" >
                    {cours.nom}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {cours.heureD} - {cours.heureF}
                  </Typography>
                  <Button size="small" color="primary">Plus de cours</Button>
                </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(FeuilleAppel));
