import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import CreateIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import CheckAuth from '../Main/CheckAuth';

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

class GestionPromos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: [],
            open: false,
        }
    }

    componentDidMount() {
        let currentComponent = this;

        fetch(window.location.protocol + '//' + window.location.hostname + ':3010/classes/')
            .then((res) => res.json())
            .then(function(promos) {
                currentComponent.setState({promos});
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
        const {promos} = this.state;

        // var promotions= this.state.promos.map( (item, index) => {
            return (
                <div className={classes.root}>
                    <CheckAuth />
                <Grid container spacing={3}>
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
                                                {/* <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    onClick=""
                                                    startIcon={<CreateIcon />}
                                                /> */}
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
            </div>
                // <Grid key={item._id} container spacing={3} className={classes.row}>
                //     <Grid item xs={2}></Grid>
                //     <Grid item md={8}>
                //         <Card className={classes.card}>
                //             <CardActionArea href={'/gestionPromo/'} >
                //                 <CardContent>
                //                     <Grid container spacing={3}>
                //                         <Grid item xs={3}>
                //                             <Typography gutterBottom className={classes.typo} variant="h5" component="h2">
                //                                 {item.label}
                //                             </Typography>
                                            
                //                         </Grid>
                //                         <Grid item xs={3}>
                                            
                //                         </Grid>
                //                     </Grid>
                //                     <Grid container spacing={3}>
                //                         <Grid item xs={3}>
                //                             <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                //                                 {item.filiere}
                //                             </Typography>
                //                         </Grid>
                //                         <Grid item xs={3}>
                //                             <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                //                                 {item.annee}
                //                             </Typography>
                //                         </Grid>
                //                     </Grid>
                //                 </CardContent>
                //             </CardActionArea>                            
                //         </Card>
                //     </Grid>
                //     <Grid item xs={2}></Grid>
                // </Grid>
            )
        // // });      
        
        // return (
        //     <div className={classes.root}>
        //         <Grid container spacing={3}>                
        //             {promotions}
        //             {/* <Typography gutterBottom className={classes.typo} variant="h5" component="h2">
        //                 Hello World !
        //             </Typography> */}
        //         </Grid>
        //     </div>
        // );
    }
}

export default withStyles(styles)(GestionPromos);