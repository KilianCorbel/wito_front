import React from 'react';
import { render } from 'react-dom';
import { QRCode } from 'react-qr-svg';
import Navbar from '../Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const styles = {
  root: {
    fontFamily: 'sans-serif',
  
    
  },
  h1: {
    textAlign: 'center',
  },
  qrcode: {
    textAlign: 'center',
  },
  text: {
      textAlign : 'right',
  }
};
export default function AutoGrid() {
    const classes = useStyles();
  
    return (
    <div>
         <div><Navbar/></div> 
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
            <h1 style={styles.h1}>Présence</h1>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
            <div style={styles.root} >
            <h1 style={styles.h1}>Feuille d'appel</h1>
            <div style={styles.qrcode}  >
            <QRCode
                level="Q"
                style={{ width: 256 }}
                value={JSON.stringify({
                id: 928328,
                name: 'Vive les licornes ! ',
                insider: true,
                })}
            />
            </div>
        </div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
                <div>
                Cours : AOS
                </div>
                <br/>
                <div>
                Salle : IBGBI - 107
                </div>
                <br/>
                <div>
                Date : 23/10/2019
                </div>
                <br/>
                <div>
                Heure : 8h30 - 11h45
                </div>
                <br/>
                <div>
                Prof : Franck Ledoux
                </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
    );
  }
/*export default class FeuilleAppel extends React.Component {
  componentDidMount() {}
 
  render() {
    return (
          <div style={styles.root} >
            <h1 style={styles.h1}>Feuille d'appel</h1>
            <div style={styles.qrcode}  >
            <QRCode
                level="Q"
                style={{ width: 256 }}
                value={JSON.stringify({
                id: 928328,
                name: 'Vive les licornes ! ',
                insider: true,
                })}
            />
            </div>
        </div>
    );
  }
}

render(<FeuilleAppel />, document.getElementById('root'));*/
