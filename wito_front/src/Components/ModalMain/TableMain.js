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
import CheckAuth from '../Main/CheckAuth';
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

  componentDidMount() {
    let currentComponent = this;
    console.log("user role " + localStorage.getItem('user_role'));
    console.log("user id " + localStorage.getItem('user_id'));
    if (localStorage.getItem('user_role') !== null && localStorage.getItem('user_id') !== null) {
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
    }    
  }

  handleClickOpen = (id) => {
    this.setState({open : true});
  };

  handleClose = () => {
    this.setState({open : false});
  };

  handleChange = event => {
    this.setState({values : oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    })});
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

  render(){
    const { classes } = this.props;

    var cours = this.state.getCours.map( (item, index) => {
      return (
        <Grid key={item._id} container  className={classes.row}>
            <Grid item xs={2}></Grid>
            <Grid item md={8}>
              <Card className={classes.card} >
              <CardActionArea href={'/feuilleAppel/'+item._id} >
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <Typography gutterBottom className={classes.typo} variant="h5" component="h2">
                          {item.nom}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                          {item.professeur.utilisateur.prenom} {item.professeur.utilisateur.nom}
                          </Typography>
                        </Grid>
                      <Grid item xs={3}>
                        
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
                
                {/* A n'afficher que si le user co est prof */}
                {/*
                <CardActions>
                  <Button size="small" color="primary" onClick={this.handleClickOpen(item._id)}>
                    Modifier
                  </Button>
                  <Button size="small" color="secondary">
                    Supprimer
                  </Button>
                </CardActions>
                */}
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
            open={this.state.open}
            onClose={this.state.handleClose}
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
                          onChange={this.state.handleDateChange}
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
                      id="time-picker"
                      label="Heure de début"
                      value={this.state.selectedTimeS}
                      onChange={this.state.handleTimeChangeS}
                      KeyboardButtonProps={{
                        'aria-label': 'Modifier l\'heure',
                      }}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Heure de fin"
                        value={this.state.selectedTimeE}
                        onChange={this.state.handleTimeChangeE}
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
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectPromo">Promotion</InputLabel>
                        <Select
                          value={this.state.values.promo}
                          fullWidth
                          onChange={this.state.handleChange}
                          label="Promotion"
                          inputProps={{
                            name: 'promo',
                            id: 'selectPromo',
                          }}
                        >
                          <MenuItem value="l3miaa">L3MIAA</MenuItem>
                          <MenuItem value="m1miaa">M1MIAA</MenuItem>
                          <MenuItem value="m2miaa">M2MIAA</MenuItem>
                          <MenuItem value="l3miai">L3MIAI</MenuItem>
                          <MenuItem value="m1miai">M1MIAI</MenuItem>
                          <MenuItem value="m2miai">M2MIAI</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.state.handleClose} color="primary">
                Modifier le cours
              </Button>
              <Button onClick={this.state.handleClose} color="secondary">
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