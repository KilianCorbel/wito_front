import React, { Component } from 'react';
import CheckAuth from '../Main/CheckAuth';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    root: {
      flexGrow: 1,
      //smargin: theme.spacing(5),
    },
    card: {
        width: '100%',
        marginBottom: 10,
    }
});

class Administration extends Component {
  constructor(props){
      super(props);
      this.state = {
          value: '',
          setValue: '',
      }
  }

  handleChange = (event, newValue) => {
    this.setState({setValue : newValue});
  };

  handleChangeIndex = (index) => {
    this.setState({setValue : index});
  };

  render() {
    const {classes} = this.props;

    return (
        <div className={classes.root}>
            <CheckAuth/>

            <Grid spacing={3}>
                <Grid item xs={1} md={3}></Grid>

                <Grid item xs={10} md={6} >
                    <Card className={classes.card}>
                        <CardActionArea href='/validation'>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="https://i.imgur.com/DI9m4DK.jpg"
                            title="Validation étudiants"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Valider nouveaux étudiants
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>                 
                </Grid>

                <Grid item xs={1} md={3}></Grid>
            </Grid>

            <Grid spacing={3}>
                <Grid item xs={1} md={3}></Grid>

                <Grid item xs={10} md={6}>
                    <Card className={classes.card}>
                        <CardActionArea href='/etudiants'>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="https://i.imgur.com/xz9IFHv.jpg"
                            title="Gestion étudiants"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Gestion étudiants
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>                 
                </Grid>

                <Grid item xs={1} md={3}></Grid>
            </Grid>

            <Grid spacing={3}>
                <Grid item xs={1} md={3}></Grid>

                <Grid item xs={10} md={6}>
                <Card className={classes.card}>
                        <CardActionArea href='/profs'>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="https://i.imgur.com/ktKtM2t.jpg"
                            title="Gestion professeurs"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Gestion professeurs
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={1} md={3}></Grid>
            </Grid>

            <Grid spacing={3}>
                <Grid item xs={1} md={3}></Grid>

                <Grid xs={10}  md={6}>
                <Card className={classes.card}>
                        <CardActionArea href='/promos'>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="https://i.imgur.com/1QLXjvc.jpg"
                            title="Gestion promotion"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Gestion promotions
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </div>
      );
  }
  
}

export default withStyles(styles)(Administration);