import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
  
const rows = [
// createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// createData('Eclair', 262, 16.0, 24, 6.0),
// createData('Cupcake', 305, 3.7, 67, 4.3),
// createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const styles = theme => ({
    root: {
      flexGrow: 1,
      //smargin: theme.spacing(5),
    },
    paper: {
      //padding: theme.spacing(2),
    },
    button: {
        marginTop: 60,
    },
    row: {
      margin: 0,
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

class GestionProfs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profs: [],
            open: false,
            nom : '',
            selectedDate : new Date(),
            selectedTimeS : new Date(),
            selectedTimeE : new Date(),
            salle : '',
            promo: '',
            getPromos : [],
            fullWidth : true,
            maxWidth : 'sm'
        }
    }

    handleClickOpen = () => {
        this.setState({open : true});
    };
    
    handleClose = () => {
        this.setState({open : false});
        window.location.reload();
    };

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
  
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/',{
              method: 'POST',
              body: JSON.stringify({
                nom : this.state.nom,
                prenom : document.getElementById('date-picker-inline').value,
                mail : document.getElementById('time-picker-begin').value,
                mdp : document.getElementById('time-picker-end').value
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

    componentDidMount() {
        let currentComponent = this;

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/')
            .then((res) => res.json())
            .then(function(profs) {
                currentComponent.setState({profs});
            })
    }

    handleClickOpen = (id) => {
        this.setState({open : true});
    };
    
    handleClose = () => {
        this.setState({open : false});
    };

    render() {
        const {classes} = this.props;
        const {profs} = this.state;
        
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                        <TableContainer >
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell align="right">Prénom</TableCell>
                                        <TableCell align="right">Mail</TableCell>
                                        <TableCell align="right">Mot de passe</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {profs.map(row => (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {row.nom}
                                            </TableCell>
                                            <TableCell align="right">{row.prenom}</TableCell>
                                            <TableCell align="right">{row.mail}</TableCell>
                                            <TableCell align="right">{row.mdp}</TableCell>
                                            <TableCell align="right">
                                                <Fab color="primary" aria-label="edit">
                                                    <CreateIcon />
                                                </Fab>
                                                
                                                <Fab aria-label="delete"  color="secondary">
                                                    <DeleteIcon />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))} 
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={5}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            onClick={this.handleClickOpen}
                            startIcon={<AddIcon />}
                        >
                            Professeur
                        </Button>
                    </Grid>
                
                    <Dialog
                        fullWidth={this.state.fullWidth}
                        maxWidth={this.state.maxWidth}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="max-width-dialog-title"
                    >
                        
                    <form className={classes.form} noValidate>
                    <FormControl className={classes.formControl}>
                        <DialogTitle>Ajouter un professeur</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            autoFocus
                                            id="name"
                                            label="Nom"
                                            type="name"
                                            value={this.state.nom} 
                                            onChange={(ev)=>this.setState({nom:ev.target.value})}                                        
                                        />
                                    </Grid>                  
                                    
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="surname"
                                            label="Prénom"
                                            type="surname"
                                            value={this.state.nom} 
                                            onChange={(ev)=>this.setState({nom:ev.target.value})}                                        
                                        />
                                    </Grid>                  
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="mail"
                                            label="Mail"
                                            type="mail"
                                            value={this.state.nom} 
                                            onChange={(ev)=>this.setState({nom:ev.target.value})}                                        
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="mdp"
                                            label="Mot de passe"
                                            type="mdp"
                                            value={this.state.nom} 
                                            onChange={(ev)=>this.setState({nom:ev.target.value})}                                        
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                            Ajouter le professeur
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
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

export default withStyles(styles)(GestionProfs);