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
import validate from '../../img/validate.jpg';
import prof from '../../img/professeur.jpg';
import students from '../../img/students.jpg';
import promo from '../../img/promo.jfif';



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

  componentDidMount() {
      let currentComponent = this;

      const role = localStorage.getItem('user_role');
      console.log(role);

      if (role !== "administrateur") {
        window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/cours');
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
                            alt="Validation"
                            height="140"
                            image={validate}
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
                            image={students}
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
                            image={prof}
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
                            image={promo}
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