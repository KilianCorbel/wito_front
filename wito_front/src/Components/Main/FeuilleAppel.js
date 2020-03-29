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
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Icon from '@material-ui/core/Icon';
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
    },
    export: {
      marginLeft: '5vw',
    }
  });

class FeuilleAppel extends Component{
  constructor(props) {
    super(props);
    this.state = {
        idcours : '',
        getCours: '',
        prenom: '',
        nom: '',
        cours : null,
        nomCours: '',
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
        currentComponent.setState({nomCours : cours.nom});
        currentComponent.setState({prenom : cours.professeur.utilisateur.prenom});
        currentComponent.setState({nom : cours.professeur.utilisateur.nom});
        console.log(currentComponent.state.prenom);
        
        // let id = cours._id;
        // currentComponent.setState(id);

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/' + cours.classe._id)
          .then((resp) => resp.json())
          .then(function(classe) {
            console.log(classe);
            currentComponent.setState(classe);
          })

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/etudiants/classe/'+ cours.classe._id)
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

  generatePdf(event) {
    event.preventDefault();

    const students = document.getElementById('std');
    const cours = document.getElementById('cours');
    html2canvas(students, { onclone: (document) => {
      //document.getElementById('print-button').style.visibility = 'hidden'
    }})
    .then((canvas) => {
      html2canvas(cours, { onclone: (document) => {
        //document.getElementById('print-button').style.visibility = 'hidden'
      }})
      .then((result) => {
        const img = canvas.toDataURL('image/png');
        const img2 = result.toDataURL('image/png');
        const pdf = new jsPdf()
        pdf.addImage(img2, 'JPEG', 20, 10, 100, 50);
        pdf.addImage(img, 'JPEG', 25, 80, 100, 60);
        
        pdf.save('your-filename.pdf')
      });        
  });
}

  render() {
    const {classes} = this.props;
    const cours = this.state;
    const prof = this.state;
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
        <div id="root" className={classes.root}>
          <Grid container>
            <Grid xs={12}>
              <Button className={classes.export} onClick={this.generatePdf} variant="contained" color="secondary">
                Export PDF
              </Button>
            </Grid>
            <Grid xs={12} md={4} xl={4}>
              <div id="students">
                <Paper id="std" className={classes.promo} elevation={0}>
                  <Typography variant="h5" color="textSecondary">
                    Promotion {classe.label}
                  </Typography>
                  <List className={classes.list} aria-label="promotion">                  
                      {etudiants.map(etudiant =>
                        <ListItem key={etudiant._id}  primary={etudiant.color} className={classes.listPromo} button>
                          <ListItemText  primary={etudiant.utilisateur.nom+' '+etudiant.utilisateur.prenom} />
                          {/* <ListItemIcon color={etudiant.color}> */}
                            {/* A Changer quand l'étudiant est marqué présent */}
                            
                            <Icon color={etudiant.color}>checkcircle</Icon>
                          {/* </ListItemIcon> */}
                        </ListItem>
                      )}
                  </List>
                </Paper>
              </div>
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
              <Paper id="cours" elevation={0} className={classes.cours}>
                  <Typography className={classes.titreCours} color="textSecondary" gutterBottom>
                    Cours du {cours.date}
                  </Typography>
                  <Typography variant="h5" >
                    {this.state.nomCours}
                  </Typography>
                  <Typography className={classes.titreCours} color="textSecondary" gutterBottom>
                    {this.state.prenom} {this.state.nom}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {cours.heureD} - {cours.heureF}
                  </Typography>
                  {/* <Button size="small" color="primary">Plus de cours</Button> */}
                </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(FeuilleAppel));
