import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import CheckAuth from '../Main/CheckAuth';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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
    },
    button: {
        marginTop: 60,
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
    },
    icons: {
        margin : '5px',
    }
  });

class GestionPromos extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            promos: [],
            open: false,
            openUpdate: false,
            id: '',
            filiere: '',
            annee: '',
            label: '',
            selectedDate : new Date(),
        }
    }

    handleUpdate(event) {
        event.preventDefault();
        let currentComponent = this.state;

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/' + this.state.id,{
            method: 'PUT',
            body: JSON.stringify({
              filiere : this.state.filiere,
              annee : this.state.annee,
              label : this.state.label
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

    /*   fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/')
             .then((res) => res.json())
            .then(function(promos) {
                currentComponent.setState({promos});
            })
    }
*/
    handleClickOpen = (id) => {
        this.setState({open : true});
    };
    
    handleClose = () => {
        this.setState({open : false});
    };

    handleDateChange = date => {
        this.setState({selectedDate : date});
    };

    handleSubmit(event) {
        event.preventDefault();
  
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/',{
              method: 'POST',
              body: JSON.stringify({
                filiere : this.state.filiere,
                annee : this.state.annee,
                label : this.state.label
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

    handleDelete = (id) => {
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/'+id,{
                method: 'DELETE',
                headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
                console.log(response => response.json());
                return response => response.json()
            })
        window.location.reload();
    }

    componentDidMount() {
        let currentComponent = this;

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/')
            .then((res) => res.json())
            .then(function(promos) {
                console.log(promos);
                currentComponent.setState({promos});
            })
    }

    handleUpdateClickOpen = (id) => {
        let currentComponent = this;
        this.setState({id: id});

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/' +id)
            .then((res) => res.json())
            .then(function(promo) {
                console.log(promo);
                
                currentComponent.setState({filiere: promo.filiere});
                currentComponent.setState({annee: promo.annee});
                currentComponent.setState({label: promo.label});
                currentComponent.setState({promo});
            })

        this.setState({openUpdate : true});
    };

    handleUpdateClose = () => {
        this.setState({openUpdate : false});

        this.setState({filiere: ''});
        this.setState({annee: ''});
        this.setState({label: ''});
    };

    render() {
        const {classes} = this.props;
        const {promos} = this.state;

        return (
            <div className={classes.root}>
                <CheckAuth />
            <Grid spacing={3}>
                <Grid item xs={3}></Grid>

                <Grid item xs={6}>
                    <TableContainer >
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Promotion</TableCell>
                                    <TableCell align="center">Libellé</TableCell>
                                    <TableCell align="center">Année</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {promos.map(row => (
                                    <TableRow>
                                        <TableCell align="center">{row.label}</TableCell>
                                        <TableCell align="center">{row.filiere}</TableCell>
                                        <TableCell align="center">{row.annee}</TableCell>
                                        <TableCell align="center">
                                            <Fab size="small" className={classes.icons} onClick={(id) => this.handleUpdateClickOpen(row._id)} color="primary" size="small" aria-label="edit">
                                                <CreateIcon />
                                            </Fab>
                                            
                                            <Fab size="small" className={classes.icons} onClick={(id) => this.handleDelete(row._id)} aria-label="delete"  color="secondary">
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

            <Grid spacing={5}>
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
                        Promotion
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
                    <DialogTitle>Ajouter une promotion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                <TextField
                                    id="label"
                                    label="Label de la promotion"
                                    type="label"
                                    value={this.state.label} onChange={(ev)=>this.setState({label:ev.target.value})}
                                />
                                </Grid>                  
                                
                                                 
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        id="libelle"
                                        label="Libellé de la promotion"
                                        type="libelle"
                                        value={this.state.filiere} onChange={(ev)=>this.setState({filiere:ev.target.value})}
                                    />
                                </Grid> 
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        id="annee"
                                        label="Année"
                                        type="annee"
                                        value={this.state.annee} onChange={(ev)=>this.setState({annee:ev.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleSubmit} color="primary">
                        Ajouter la promotion
                    </Button>
                    <Button onClick={this.handleClose} color="secondary">
                        Fermer
                    </Button>
                    </DialogActions>
                </FormControl>
                </form>
                </Dialog>

                 {/* Dialog modification promos */}
                 <Dialog
                        fullWidth={this.state.fullWidth}
                        maxWidth={this.state.maxWidth}
                        open={this.state.openUpdate}
                        onClose={this.handleUpdateClose}
                        aria-labelledby="max-width-dialog-title"
                    >
                        
                    <form className={classes.form} noValidate>
                    <FormControl className={classes.formControl}>
                        <DialogTitle>Modifier une promotion</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        id="filiere"
                                        label="Filiere de la promo"
                                        type="filiere"
                                        value={this.state.filiere} onChange={(ev)=>this.setState({filiere:ev.target.value})}
                                    />
                                    </Grid>                  
                                    
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        id="annee"
                                        label="Annee de la promo"
                                        type="annee"
                                        value={this.state.annee} onChange={(ev)=>this.setState({annee:ev.target.value})}
                                    />
                                    </Grid>                  
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="label"
                                            label="label de la promo"
                                            type="label"
                                            value={this.state.label} 
                                            onChange={(ev)=>this.setState({label:ev.target.value})}                                        
                                        />
                                    </Grid>
                                   
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleUpdate} color="primary">
                            Modifier la promo
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
        )
    }
}

export default withStyles(styles)(GestionPromos);