import React, { Component } from 'react';
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
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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

class ValiderEtudiant extends Component {
    constructor(props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            etudiants: [],
            etudiant: null,
            id: '',
            studentId: '',
            nom : '',
            prenom : '',
            mail : '',
            fullWidth : true,
            maxWidth : 'sm'
        }
    }

    handleValidate = (id, studentId) => {  
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/' + id,{
          method: 'PUT',
              body: JSON.stringify({
                role : 'etudiant'
          }),
          headers: {"Content-Type": "application/json"}
          })
          .then(function(response){
              console.log(response => response.json());
              return response => response.json()
          })
        window.location.reload();
    }

    handleDelete = (id, studentId) => {
        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/etudiants/'+studentId,{
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

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/etudiants/inscrits/')
            .then((res) => res.json())
            .then(function(etudiants) {
                console.log(etudiants);
                currentComponent.setState({etudiants});
            })
    }

    render() {
        const {classes} = this.props;
        const {etudiants} = this.state;
        
        return (
            <div className={classes.root}>
                <CheckAuth/>
                <Grid spacing={3}>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                        <TableContainer >
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell align="center">Prénom</TableCell>
                                        <TableCell align="center">Mail</TableCell>
                                        <TableCell align="center">Statut</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {etudiants.map(row => (
                                        <TableRow>
                                            <TableCell component="th" scope="row">{row.utilisateur.nom}</TableCell>
                                            <TableCell align="center">{row.utilisateur.prenom}</TableCell>
                                            <TableCell align="center">{row.utilisateur.mail}</TableCell>
                                            <TableCell align="center">{row.utilisateur.role}</TableCell>
                                            <TableCell align="center">
                    
                                                <Fab size="small" className={classes.icons} onClick={(id, studentID) => this.handleValidate(row.utilisateur._id, row._id)} color="primary" aria-label="valider">
                                                <CheckIcon/>
                                                </Fab>
                                                
                                                <Fab size="small" className={classes.icons} onClick={(id, studentId) => this.handleDelete(row.utilisateur._id, row._id)} aria-label="refuser"  color="secondary">
                                                  <CloseIcon />
                                                
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
            </div>
            
        );
    }
}

export default withStyles(styles)(ValiderEtudiant);