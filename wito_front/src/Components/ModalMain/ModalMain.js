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

export default function ModalMain() {
    const useStyles = makeStyles(theme => ({
      form: {
        display: 'flex',
        flexDirection: 'column',
      },
      formControl: {
        marginTop: theme.spacing(1),
        display: 'flex',
        minWidth: 120,
      },
      formControlLabel: {
        marginTop: theme.spacing(1),
      },
    }));
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [promotion, setPromotion] = React.useState([]);
    const [values, setValues] = React.useState({
      promo: '',
    });
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = event => {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedTimeS, setSelectedTimeS] = React.useState(new Date());
    const [selectedTimeE, setSelectedTimeE] = React.useState(new Date());

    const handleDateChange = date => {
      setSelectedDate(date);
    };

    const handleTimeChangeS = time => {
      setSelectedTimeS(time);
    };

    const handleTimeChangeE = time => {
      setSelectedTimeE(time);
    };

    return(
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          Cours
        </Button>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
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
                        value={selectedDate}
                        onChange={handleDateChange}
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
                    value={selectedTimeS}
                    onChange={handleTimeChangeS}
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
                      value={selectedTimeE}
                      onChange={handleTimeChangeE}
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
                        value={values.promo}
                        fullWidth
                        onChange={handleChange}
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
            <Button onClick={handleClose} color="primary">
              Ajouter le cours
            </Button>
            <Button onClick={handleClose} color="secondary">
              Fermer
            </Button>
          </DialogActions>
        </FormControl>
        </form>
        </Dialog>
      </React.Fragment>
  );
}
