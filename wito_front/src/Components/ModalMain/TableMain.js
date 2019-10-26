import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import LaunchIcon from '@material-ui/icons/Launch';
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
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
    paddingLeft: theme.spacing(2),
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
    marginTop: theme.spacing(1),
    display: 'flex',
    minWidth: 120,
  },
}));

export default function TableMain() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [promotion, setPromotion] = React.useState([]);
  const [values, setValues] = React.useState({
    promo: '',
  });
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTimeS, setSelectedTimeS] = React.useState(new Date());
  const [selectedTimeE, setSelectedTimeE] = React.useState(new Date());

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

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleTimeChangeS = time => {
    setSelectedTimeS(time);
  };

  const handleTimeChangeE = time => {
    setSelectedTimeE(time);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>        
        <Grid container spacing={3} className={classes.row}>
          <Grid item xs={2}></Grid>
          <Grid item md={8}>
          <Card className={classes.card}>
            <CardActionArea href='/feuilleAppel'> 
                <CardContent>
                  {/* <Typography gutterBottom variant="h5" component="h2">
                    ARSI
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Cours du : 26/10/2019
                  </Typography> */}
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                    <Typography gutterBottom className={classes.typo} variant="h5" component="h2">
                      GESO
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                        Mansour EL-GHOUL
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      
                    </Grid>
                    <Grid item xs={6} className={classes.fab}>
                      {/* <Fab color="primary" aria-label="add" href="/feuilleAppel">
                        <LaunchIcon />
                      </Fab> */}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      Cours du : 26/10/2019
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      {/* Heure début - Heure fin */}
                      Horaire : 13h00 - 16h15
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      Promotion : M1MIAA
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      
                    </Grid>
                  </Grid>
                </CardContent>
                <LinearProgress
                  className={classes.progress}
                  value={70}
                  variant="determinate"
                />
              </CardActionArea>
              {/* A n'afficher que si le user co est prof */}
              <CardActions>
                <Button size="small" color="primary" onClick={handleClickOpen}>
                  Modifier
                </Button>
                <Button size="small" color="secondary">
                  Supprimer
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          
        <form className={classes.form} noValidate>
        <FormControl className={classes.formControl}>
          <DialogTitle>Modifier le cours</DialogTitle>
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
              Modifier le cours
            </Button>
            <Button onClick={handleClose} color="secondary">
              Fermer
            </Button>
          </DialogActions>
        </FormControl>
        </form>
        </Dialog>
        
        <Grid container spacing={3} className={classes.row}>
          <Grid item xs={2}></Grid>
          <Grid item md={8}>
          <Card className={classes.card}>
          <CardActionArea href='/feuilleAppel'>
                <CardContent>
                
                  {/* <Typography gutterBottom variant="h5" component="h2">
                    ARSI
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Cours du : 26/10/2019
                  </Typography> */}
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                    <Typography gutterBottom className={classes.typo} variant="h5" component="h2">
                      ARSI
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                        Laurent BREDA
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      
                    </Grid>
                    <Grid item xs={6} className={classes.fab}>
                      {/* <Typography variant="body2" color="textSecondary" className={classes.name} component="p">
                        Laurent BREDA
                      </Typography> */}
                      <Fab color="primary" aria-label="add" >
                        <LaunchIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      Cours du : 26/10/2019
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      {/* Heure début - Heure fin */}
                      Horaire : 8h30 - 11h45
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      Promotion : M1MIAA
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      
                    </Grid>
                  </Grid>
                </CardContent>
                </CardActionArea>
                <LinearProgress
                  className={classes.progress}
                  value={100}
                  variant="determinate"
                />
              
              {/* A n'afficher que si le user co est prof */}
              {/* <CardActions>
                <Button size="small" color="primary">
                  Modifier
                </Button>
                <Button size="small" color="secondary">
                  Supprimer
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        <Grid container spacing={3} className={classes.row}>
          <Grid item xs={2}></Grid>
          <Grid item md={8}>
          <Card className={classes.card}>
          <CardActionArea href='/feuilleAppel'>
                <CardContent>
                  {/* <Typography gutterBottom variant="h5" component="h2">
                    ARSI
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Cours du : 26/10/2019
                  </Typography> */}
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                    <Typography gutterBottom className={classes.typo} variant="h5" component="h2">
                      PRDLL
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                        Didier COURTAUD
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      
                    </Grid>
                    <Grid item xs={6} className={classes.fab}>
                      {/* <Typography variant="body2" color="textSecondary" className={classes.name} component="p">
                        Laurent BREDA
                      </Typography> */}
                      {/* <Fab color="primary" aria-label="add" >
                        <LaunchIcon />
                      </Fab> */}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      Cours du : 28/10/2019
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      {/* Heure début - Heure fin */}
                      Horaire : 8h30 - 11h45
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary" className={classes.typo} component="p">
                      Promotion : M1MIAA
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      
                    </Grid>
                  </Grid>
                </CardContent>
                </CardActionArea>
                <LinearProgress
                  className={classes.progress}
                  value={10}
                  variant="determinate"
                />
              
              {/* A n'afficher que si le user co est prof */}
              {/* <CardActions>
                <Button size="small" color="primary">
                  Modifier
                </Button>
                <Button size="small" color="secondary">
                  Supprimer
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>        
      </Grid>
    </div>

    // <div className={classes.root}>
    //   <Paper className={classes.paper}>
    //     <Table className={classes.table} size="small" aria-label="a dense table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell><b>Nom du cours</b></TableCell>
    //           <TableCell align="center"><b>Date</b></TableCell>
    //           <TableCell align="center"><b>Salle</b></TableCell>
    //           <TableCell align="center"><b>Heure de début de cours</b></TableCell>
    //           <TableCell align="center"><b>Heure de fin de cours</b></TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {rows.map(row => (
    //           <TableRow key={row.name}>
    //             <TableCell component="th" scope="row">
    //               {row.name}
    //             </TableCell>
    //             <TableCell align="center">{row.calories}</TableCell>
    //             <TableCell align="center">{row.fat}</TableCell>
    //             <TableCell align="center">{row.carbs}</TableCell>
    //             <TableCell align="center">{row.fin}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </Paper>
    // </div>
  );
}
