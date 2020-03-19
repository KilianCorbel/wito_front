import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
import CheckAuth from '../Main/CheckAuth';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import moment from 'moment';

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
    marginBottom: 15,
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

//export default function TableMain() {
class TableMain extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
        getCours : [],
        id: '',
        nom : '',
        selectedDate : new Date(),
        selectedTimeS : new Date(),
        selectedTimeE : new Date(),
        salle : '',
        promo: '',
        prof : '',
        openUpdate : false,
        display : false,
        fullWidth : true,
        maxWidth : 'sm',
        getPromos : [],
        getProfs : []
      }
  }

  componentDidMount() {
    let currentComponent = this;

    if(localStorage.getItem('user_role') === "administrateur" && localStorage.getItem('user_id') !== null) {
      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/')
      .then((resp) => resp.json())
      .then(function(data) {
        var list = [];
        if (JSON.stringify(data) != '{}') {
          data.forEach(function(cours) {
            list.push(cours)
          });
        }        
        console.log(list);
        currentComponent.setState({getCours : list});
      })
      .then(
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/')
            .then((resp) => resp.json())
            .then(function(data) {
            console.log("data get " + JSON.stringify(data));
            var list = [];
            data.forEach(function(promo) {
                list.push({id:promo._id, label:promo.label})
            });
            console.log(list);
            currentComponent.setState({getPromos : list});
            })
    )
    .then(
      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/')
          .then((resp) => resp.json())
          .then(function(data) {
          var liste = [];
          data.forEach(function(prof) {
            liste.push({id:prof._id, nom:prof.utilisateur.nom, prenom:prof.utilisateur.prenom})
          });
          console.log(data);
          currentComponent.setState({getProfs : liste});
          })
  )
    }
    if (localStorage.getItem('user_role') !== null && localStorage.getItem('user_role') !== "administrateur" && localStorage.getItem('user_id') !== null) {
      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/' + localStorage.getItem('user_role') + '/' + localStorage.getItem('user_id'))
      .then((resp) => resp.json())
      .then(function(data) {
        console.log(data);
        var list = [];
        if (JSON.stringify(data) != '{}') {
          data.forEach(function(cours) {
            list.push(cours)
          });
        }        
        console.log(list);
        currentComponent.setState({getCours : list});
      })
      .then(
          fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/')
              .then((resp) => resp.json())
              .then(function(data) {
              var list = [];
              data.forEach(function(promo) {
                  list.push({id:promo._id, label:promo.label})
              });
              console.log(list);
              currentComponent.setState({getPromos : list});
              })
      )
      .then(
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/')
            .then((resp) => resp.json())
            .then(function(data) {
            var liste = [];
            data.forEach(function(prof) {
              liste.push({id:prof._id, nom:prof.utilisateur.nom, prenom:prof.utilisateur.prenom})
            });
            console.log(liste);
            currentComponent.setState({getProfs : liste});
            })
    )
    }    
  }

  handleUpdateClose = () => {
    this.setState({openUpdate : false});

    this.setState({nom: ''});
    this.setState({selectedDate: new Date()});
    this.setState({selectedTimeS: new Date()});
    this.setState({selectedTimeE: new Date()});
    this.setState({salle: ''});
    this.setState({promo: ''});
    this.setState({prof : ''});
  };

  handleChange = event => {
    this.setState({promo : event.target.value});
  };

  handleProfChange = event => {
    this.setState({prof : event.target.value});
  };

  handleDateChange = date => {
    this.setState({selectedDate : date});
  };

  handleTimeChangeS = time => {
    this.setState({selectedTimeS : time});
  };

  handleTimeChangeE = time => {
    this.setState({selectedTimeE : time});
  };

  handleUpdate(event) {
      event.preventDefault();
      let currentComponent = this.state;

      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/' + this.state.id,{
            method: 'PUT',
            body: JSON.stringify({
              nom : this.state.nom,
              date : document.getElementById('date-picker-inline').value,
              heureD : document.getElementById('time-picker-begin').value,
              heureF : document.getElementById('time-picker-end').value,
              salle : this.state.salle,
              classe : this.state.promo,
              professeur : this.state.prof
        }),
        headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
            console.log(response => response.json());
            console.log('promo ' + currentComponent.promo);
            console.log('prof  ' + currentComponent.prof);
          //   return response => response.json()
        })

      this.setState({openUpdate : false});
      //window.location.reload();
  }

  handleUpdateClickOpen = (id) => {
      let currentComponent = this;
      this.setState({id: id});

      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/' + id)
          .then((res) => res.json())
          .then(function(cours) {
            console.log(cours);
            var date = cours.date.split("/");
            date = date[1] + "/" + date[0] + "/" + date[2];
              
            currentComponent.setState({nom: cours.nom});
            currentComponent.setState({selectedDate: new Date(date)});
            currentComponent.setState({selectedTimeS: new Date(moment(date +' '+ cours.heureD).format())});
            currentComponent.setState({selectedTimeE: new Date(moment(date +' '+ cours.heureF).format())});
            currentComponent.setState({salle: cours.salle});
            currentComponent.setState({promo: cours.classe});
            currentComponent.setState({prof : cours.professeur._id});
          })

      this.setState({openUpdate : true});
  };

  handleDelete = (id) => {
      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/'+id,{
              method: 'DELETE',
              headers: {"Content-Type": "application/json"}
          })
          .then(function(response){
              console.log(response => response.json());
              return response => response.json()
          })
      window.location.reload();
  }

  render(){
    const { classes } = this.props;
    let gestion;

    var promos = this.state.getPromos.map( (promo) => {
      return (
        <MenuItem key={promo.id} value={promo.id}>{promo.label}</MenuItem>
      )
    });

    var profs = this.state.getProfs.map( (prof) => {
      return (
        <MenuItem key={prof.id} value={prof.id}>{prof.nom} {prof.prenom}</MenuItem>
      )
    });

    if(localStorage.getItem('user_role') == "administrateur") {
      {/* Modification possible si le user co est un admin */}
      gestion = (idcours) => {
        return (
          <CardActions>
            <Button size="small" color="primary" onClick={(id) => this.handleUpdateClickOpen(idcours)}>
              Modifier
            </Button>
            <Button size="small" color="secondary" onClick={(id) => this.handleDelete(idcours)}>
              Supprimer
            </Button>
          </CardActions>
        )
      }
    } else {
      gestion = (id) => {
      }
    }

    var cours = this.state.getCours.map( (item, index) => {
      return (
        <Grid key={item._id} container  className={classes.row}>
            <Grid item xs={2}></Grid>
            <Grid item md={8}>
              <Card className={classes.card} >
              <CardActionArea href={'/feuilleAppel/'+item._id} >
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Typography gutterBottom className={classes.typo} variant="h5" component="h2">
                          {item.nom}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          {item.professeur.utilisateur.prenom} {item.professeur.utilisateur.nom}
                          </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          Cours du : {item.date}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          Horaire : {item.heureD} - {item.heureF}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          Promotion : {item.classe.label}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          Salle : {item.salle}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  </CardActionArea>
                  <LinearProgress
                    className={classes.progress}
                    value={(item.presents.length / 20) * 100}
                    variant="determinate"
                  />
                    {gestion(item._id)}
              </Card>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
      )
    });

    return (
      <div className={classes.root}>
        <Grid spacing={3}>

          <CheckAuth />
          
          {cours}          

          <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.openUpdate}
            onClose={this.state.handleUpdateClose}
            aria-labelledby="max-width-dialog-title"
          >
            
          <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <DialogTitle>Modifier le cours</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom du cours"
                        type="name"
                        fullWidth
                        value={this.state.nom}
                        onChange={(ev)=>this.setState({nom:ev.target.value})}
                      />
                    </Grid>                  
                    
                    <Grid item xs={12} md={6}>
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date du cours"
                          value={this.state.selectedDate}
                          onChange={this.handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                    </Grid>                  
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker-begin"
                      label="Heure de début"
                      value={this.state.selectedTimeS}
                      onChange={this.handleTimeChangeS}
                      KeyboardButtonProps={{
                        'aria-label': 'Modifier l\'heure',
                      }}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker-end"
                        label="Heure de fin"
                        value={this.state.selectedTimeE}
                        onChange={this.handleTimeChangeE}
                        KeyboardButtonProps={{
                          'aria-label': 'Modifier l\'heure',
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="dense"
                        id="salle"
                        label="Salle"
                        type="name"
                        fullWidth
                        value={this.state.salle}
                        onChange={(ev)=>this.setState({salle:ev.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectPromo">Promotion</InputLabel>
                        <Select
                          value={this.state.promo}
                          fullWidth
                          onChange={this.handleChange}
                          label="Promotion"
                          inputProps={{
                            name: 'promo',
                            id: 'selectPromo',
                          }}
                        >
                          {promos}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectProf">Professeur</InputLabel>
                        <Select
                          value={this.state.prof}
                          fullWidth
                          onChange={this.handleProfChange}
                          label="Professeur"
                          inputProps={{
                            name: 'prof',
                            id: 'selectProf',
                          }}
                        >
                          {profs}
                        </Select>
                      </FormControl>
                    </Grid>
            
                  </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleUpdate} color="primary">
                Modifier le cours
              </Button>
              <Button onClick={this.handleUpdateClose} color="secondary">
                Fermer
              </Button>
            </DialogActions>
          </FormControl>
          </form>
          </Dialog>

        </Grid>
      </div>
    );
  }
}

TableMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableMain);