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
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
      }
});

class MonCompte extends Component {
  constructor(props){
      super(props);
      this.state = {
          value: '',
          setValue: '',
          student: null,
      }
  }

  componentDidMount() {
      let currentComponent = this;

      fetch(window.location.protocol + '//' + window.location.hostname + ':3010/utilisateurs/' + localStorage.getItem("user_id"))
      .then((resp) => resp.json())
      .then(function(student) {
          console.log(student);
          currentComponent.setState(student);
      })
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
                <Grid item md={4}></Grid>

                <Grid item xs={12} md={4}>

                </Grid>

                <Grid item md={4}></Grid>
            </Grid>

            <Grid spacing={3}>
                <Grid item md={4}></Grid>

                <Grid item xs={12} md={4}>

                </Grid>

                <Grid item md={4}></Grid>
            </Grid>

            <Grid spacing={3}>
                <Grid item md={4}></Grid>

                <Grid item xs={12} md={4}>

                </Grid>

                <Grid item md={4}></Grid>
            </Grid>

            <Grid spacing={3}>
                <Grid item md={4}></Grid>

                <Grid xs={12}  md={4}>

                </Grid>

                <Grid item md={4}></Grid>
            </Grid>
        </div>
      );
  }
  
}

export default withStyles(styles)(MonCompte);