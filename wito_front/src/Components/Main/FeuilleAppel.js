import React from 'react';
import { render } from 'react-dom';
import { QRCode } from 'react-qr-svg';
import Navbar from '../Navbar/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '2vh',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    cours: {
      padding: theme.spacing(3),
    },
    qr: {
      textAlign: 'center',
      marginTop: '6vh',
    },
    promo: {
      padding:theme.spacing(3),
      textAlign: 'center'
    },
    listPromo: {
      height: "2.5vh",
    },
    list: {
      marginTop: "20px"
    }
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
  },

  //modif kilian
  card: {
    minWidth: 275,
    boxShadow: 0,
  },
  titreCours: {
    fontSize: 14,
  },
  title: {
    fontSize: 30,
  },
  pos: {
    marginBottom: 8,
  },
  
};
export default function AutoGrid() {
    const classes = useStyles();
  
    return (
    <div>
      <div><Navbar/></div> 
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.promo} elevation={0}>
              <Typography variant="h5" color="textSecondary">
                Promotion M2MIAA
              </Typography>
              <List className={classes.list} aria-label="promotion">
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Fakih DARKAOUI" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Jeanne BERTOUX" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                </ListItem>
                <ListItem className={classes.listPromo} button>
                  <ListItemText  primary="Kilian CORBEL" />
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="disabled" />
                  </ListItemIcon>
                </ListItem>
                
              </List>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <Paper className={classes.qr} elevation={0}>
              <QRCode
                level="Q"
                style={{ width: 400 }}
                value="http://localhost:3010/cours/2/register/1"
              />
            </Paper>
            {/* <div style={styles.root} >
              <div style={styles.qrcode}  >
                <QRCode
                    level="Q"
                    style={{ width: 400 }}
                    value="http://localhost:3010/cours/2/register/1"
                />
              </div>
            </div> */}
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={0} className={classes.cours}>
                <Typography className={classes.titreCours} color="textSecondary" gutterBottom>
                  Cours du 02/12/2019
                </Typography>
                <Typography variant="h5" >
                  GESO
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  8h30 - 11h45
                </Typography>
                <Button size="small" color="primary">Plus de cours</Button>
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
