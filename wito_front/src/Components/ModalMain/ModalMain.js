import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formControl: {
      //marginTop: theme.spacing(1),
      display: 'flex',
      minWidth: 120,
    },
    formControlLabel: {
      //marginTop: theme.spacing(1),
    },
    typo: {
      marginTop:'25px',
    },
    divider: {
      marginTop: '20px',
      marginBottom: '20px',
    }
});

//export default function ModalMain() { 
class ModalMain extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
          nom : '',
          selectedDate : new Date(),
          selectedTimeS : new Date(),
          selectedTimeE : new Date(),
          salle : '',
          promo: '',
          getPromos : [],
          prof : '',
          getProfs : [],
          open : false,
          fullWidth : true,
          maxWidth : 'sm',
          ics : '',
        }
    }

    componentDidMount() {
      let currentComponent = this;

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

       .then(
         fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/')
          .then((resp) => resp.json())
          .then(function(data) {
            console.log(data);
            var liste = [];
            data.forEach(function(prof) {
              liste.push({id:prof._id, nom:prof.utilisateur.nom, prenom:prof.utilisateur.prenom})
            });
            currentComponent.setState({getProfs : liste});
            })
       )
    }

    handleSubmit(event) {
      event.preventDefault();

      if (this.state.ics !== '') {
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/ics',{
          method: 'POST',
          body: JSON.stringify({
            lien : this.state.ics,
            classe : this.state.promo
            }),
            headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
                console.log(response.json());
                window.location.reload();
            })
      }
      else {
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/cours/',{
          method: 'POST',
          body: JSON.stringify({
            nom : this.state.nom,
            date : document.getElementById('date-picker-inline').value,
            heureD : document.getElementById('time-picker-begin').value,
            heureF : document.getElementById('time-picker-end').value,
            salle : this.state.salle,
            classe : this.state.promo,
            professeur : localStorage.getItem('user_id')
            }),
            headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
                console.log(response => response.json());
                return response => response.json()
            })
          
          this.setState({open : false});
          window.location.reload();
        }
      }

      

    handleClickOpen = () => {
      this.setState({open : true});
    };
    
    handleClose = () => {
      this.setState({open : false});
      window.location.reload();
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

    render(){
      const { classes } = this.props;

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

      return(
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={this.handleClickOpen}
            startIcon={<AddIcon />}
          >
            Cours
          </Button>
          <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            
          <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <DialogTitle>Ajouter un cours</DialogTitle>
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
                        value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})}
                        fullWidth={this.state.fullWidth}
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
                          // value={this.state.date} onChange={(ev)=>this.setState({date:ev.target.value})}
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
                      // value={this.state.heureD} onChange={(ev)=>this.setState({heureD:ev.target.value})}
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
                        // value={this.state.heureF} onChange={(ev)=>this.setState({heureF:ev.target.value})}
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
                        value={this.state.salle} onChange={(ev)=>this.setState({salle:ev.target.value})}
                        fullWidth={this.state.fullWidth}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="selectPromo">Promotion</InputLabel>
                        <Select
                          fullWidth={this.state.fullWidth}
                          value={this.state.promo}
                          onChange={this.handleChange}
                          //value={this.state.classe} onChange={(ev)=>this.setState({classe:ev.target.value})}
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
                          fullWidth={this.state.fullWidth}
                          //value={this.state.prof}
                          onChange={this.handleProfChange}
                          //value={this.state.classe} 
                          //onChange={(ev)=>this.setState({prof:ev.target.value})}
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
                  <Divider className={classes.divider} />

                  <Grid container spacing={3}> 
                    <Grid item xs={4}  >
                        <Typography gutterBottom className={classes.typo} color="primary" variant="p" component="div">
                            Import iCalendar
                        </Typography>
                    </Grid>
                    <Grid container xs={8}  >
                        <Grid item xs={12} >
                          <TextField
                            margin="dense"
                            id="ical"
                            label="Lien fichier .ics"
                            type="name"
                            value={this.state.ics} onChange={(ev)=>this.setState({ics:ev.target.value})}
                            fullWidth={this.state.fullWidth}
                          />
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="selectPromo">Promotion</InputLabel>
                            <Select
                              fullWidth={this.state.fullWidth}
                              //value={this.state.promo}
                              onChange={this.handleChange}
                              // value={this.state.classe} onChange={(ev)=>this.setState({classe:ev.target.value})}
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
                      
                    </Grid>
                    
                  </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSubmit} color="primary">
                Ajouter le cours
              </Button>
              <Button onClick={this.handleClose} color="secondary">
                Fermer
              </Button>
            </DialogActions>
          </FormControl>
          </form>
          </Dialog>
        </React.Fragment>
    );
  }
}

ModalMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalMain)