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
        margin: 'auto',
        width: 'fit-content',
      },
      formControl: {
        marginTop: theme.spacing(2),
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
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleMaxWidthChange = event => {
      setMaxWidth(event.target.value);
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

    return(
      // <React.Fragment>
        // <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        //   Ajouter un cours
        // </Button>
      // </React.Fragment>

      <React.Fragment>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ajouter un cours
      </Button> */}
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
        <DialogTitle id="max-width-dialog-title">Ajouter un cours</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom de la matière"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="salle"
            label="salle"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="heureFin"
            label="Heure de Fin"
            type="text"
            fullWidth
          />
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">classe</InputLabel>
              <Select
                value={maxWidth}
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value="xs">L3 MIAGE APPRENTISSAGE</MenuItem>
                <MenuItem value="sm">M1 MIAGE APPRENTISSAGE</MenuItem>
                <MenuItem value="md">M2 MIAGE APPRENTISSAGE</MenuItem>
                <MenuItem value="lg">L3 MIAGE INITIAL</MenuItem>
                <MenuItem value="xl">M1 MIAGE INITIAL</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
 /* 

  return (
    */
  );
}
