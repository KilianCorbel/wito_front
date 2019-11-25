import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
          open : false,
          fullWidth : true,
          maxWidth : 'sm'
        }
    }

    componentDidMount() {
      let currentComponent = this;

      fetch('http://localhost:3010/classes/')
        .then((resp) => resp.json())
        .then(function(data) {
          //console.log("data get: "+ data);
          var list = [];
          data.forEach(function(promo) {
              list.push({id:promo._id, label:promo.label})
          });
          console.log(list);
          currentComponent.setState({getPromos : list});
        })
    }

    handleSubmit(event) {
      event.preventDefault();

      /*
      let utilisateur = {
        nom : this.state.nom,
        date : document.getElementById('date-picker-inline').value,
        heureD : document.getElementById('time-picker-begin').value,
        heureF : document.getElementById('time-picker-end').value,
        salle : this.state.salle,
        classe : this.state.promo,
        professeur : "5da02ccee841151c1cb1b00d"//localStorage.getItem('user_id')
      }
      console.log("utilisateur: " + JSON.stringify(utilisateur));
      */

      fetch('http://localhost:3010/cours/',{
            method: 'POST',
            body: JSON.stringify({
              nom : this.state.nom,
              date : document.getElementById('date-picker-inline').value,
              heureD : document.getElementById('time-picker-begin').value,
              heureF : document.getElementById('time-picker-end').value,
              salle : this.state.salle,
              classe : this.state.promo,
              professeur : "5da02ccee841151c1cb1b00d"//localStorage.getItem('user_id')
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
  
    /*const classes = useStyles();
  
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [promotion, setPromotion] = React.useState([]);
    const [values, setValues] = React.useState({
      promo: '',
    });
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedTimeS, setSelectedTimeS] = React.useState(new Date());
    const [selectedTimeE, setSelectedTimeE] = React.useState(new Date());*/

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