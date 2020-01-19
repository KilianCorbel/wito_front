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
    },
    icons: {
        margin : '5px',
    }
  });

class GestionProfs extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            profs: [],
            prof: null,
            open: false,
            openUpdate: false,
            id: '',
            profId: '',
            nom : '',
            prenom : '',
            mail : '',
            mdp : '',
            fullWidth : true,
            maxWidth : 'sm'
        }
    }

    handleUpdate(event) {
        event.preventDefault();
        let currentComponent = this.state;
  
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/' + this.state.id,{
              method: 'PUT',
              body: JSON.stringify({
                nom : this.state.nom,
                prenom : this.state.prenom,
                mail : this.state.mail,
                mdp : this.state.mdp,
                role : 'professeur'
          }),
          headers: {"Content-Type": "application/json"}
          })
          .then(function(response){
              console.log(response => response.json());
              console.log('promo ' + currentComponent.promo);
            //   return response => response.json()
          })
          .then(
            fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/' + this.state.profId,{
                method: 'PUT',
                body: JSON.stringify({
                    mail : this.state.mail
                }),
                headers: {"Content-Type": "application/json"}
                })
                .then(function(response){
                    console.log(response => response.json());
                    return response => response.json()
                })
          )

        
         
        this.setState({open : false});
        window.location.reload();
    }

    handleSubmit(event) {
        event.preventDefault();
  
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/',{
              method: 'POST',
              body: JSON.stringify({
                nom : this.state.nom,
                prenom : this.state.prenom,
                mail : this.state.mail,
                mdp : this.state.mdp,
                role: 'professeur'
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
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/'+id,{
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

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/professeurs/')
            .then((res) => res.json())
            .then(function(profs) {
                console.log(profs);
                currentComponent.setState({profs});
            })
    }

    handleClickOpen = (id) => {
        this.setState({open : true});
    };
    
    handleClose = () => {
        this.setState({open : false});
    };

    handleUpdateClickOpen = (id, profId) => {
        let currentComponent = this;
        this.setState({id: id});
        this.setState({profId: profId})

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/' +id)
            .then((res) => res.json())
            .then(function(prof) {
                console.log(prof);
                
                currentComponent.setState({nom: prof.nom});
                currentComponent.setState({prenom: prof.prenom});
                currentComponent.setState({mail: prof.mail});
                currentComponent.setState({mdp: prof.mdp});
                currentComponent.setState({prof});
            })

        this.setState({openUpdate : true});
    };
    
    handleUpdateClose = () => {
        this.setState({openUpdate : false});

        this.setState({nom: ''});
        this.setState({prenom: ''});
        this.setState({mail: ''});
        this.setState({mdp: ''});
    };

    render() {
        const {classes} = this.props;
        const {profs} = this.state;
        
        return (
            <div className={classes.root}>
                <CheckAuth/>
                <Grid container spacing={3}>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                        <TableContainer >
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell align="center">Prénom</TableCell>
                                        <TableCell align="center">Mail</TableCell>
                                        <TableCell align="center">Mot de passe</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {profs.map(row => (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {row.utilisateur.nom}
                                            </TableCell>
                                            <TableCell align="center">{row.utilisateur.prenom}</TableCell>
                                            <TableCell align="center">{row.mail}</TableCell>
                                            <TableCell align="center">{row.utilisateur.mdp}</TableCell>
                                            <TableCell align="center">
                    
                                                <Fab color="primary" className={classes.icons} onClick={(id, studentID) => this.handleUpdateClickOpen(row.utilisateur._id, row._id)} size="small" aria-label="edit">
                                                    <CreateIcon />
                                                </Fab>
                                                
                                                <Fab aria-label="delete" className={classes.icons} onClick={(id) => this.handleDelete(row._id)} size='small' color="secondary">
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
                                        id="name"
                                        label="Nom du professeur"
                                        type="name"
                                        value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})}
                                    />
                                    </Grid>                  
                                    
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        id="prenom"
                                        label="Prénom du Professeur"
                                        type="surname"
                                        value={this.state.prenom} onChange={(ev)=>this.setState({prenom:ev.target.value})}
                                    />
                                    </Grid>                  
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="mail"
                                            label="Mail"
                                            type="mail"
                                            value={this.state.mail} 
                                            onChange={(ev)=>this.setState({mail:ev.target.value})}                                        
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="mdp"
                                            label="Mot de passe"
                                            type="mdp"
                                            value={this.state.mdp} 
                                            onChange={(ev)=>this.setState({mdp:ev.target.value})}                                        
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

                    {/* Dialog modification etudiant */}
                    <Dialog
                        fullWidth={this.state.fullWidth}
                        maxWidth={this.state.maxWidth}
                        open={this.state.openUpdate}
                        onClose={this.handleUpdateClose}
                        aria-labelledby="max-width-dialog-title"
                    >
                        
                    <form className={classes.form} noValidate>
                    <FormControl className={classes.formControl}>
                        <DialogTitle>Modifier un professeur</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        id="name"
                                        label="Nom du professeur"
                                        type="name"
                                        value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})}
                                    />
                                    </Grid>                  
                                    
                                    <Grid item xs={12} md={6}>
                                    <TextField
                                        id="prenom"
                                        label="Prénom du professeur"
                                        type="surname"
                                        value={this.state.prenom} onChange={(ev)=>this.setState({prenom:ev.target.value})}
                                    />
                                    </Grid>                  
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="mail"
                                            label="Mail"
                                            type="mail"
                                            value={this.state.mail} 
                                            onChange={(ev)=>this.setState({mail:ev.target.value})}                                        
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="mdp"
                                            label="Mot de passe"
                                            type="mdp"
                                            value={this.state.mdp} 
                                            onChange={(ev)=>this.setState({mdp:ev.target.value})}                                        
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleUpdate} color="primary">
                            Modifier le professeur
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

export default withStyles(styles)(GestionProfs);