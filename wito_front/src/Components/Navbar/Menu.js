import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Disconnect from '@material-ui/icons/PowerSettingsNew';
import MoreIcon from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';
import  { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    margin: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    
  },
  bigAvatar: {
    margin: 10,
  },
  disco: {
    marginLeft: 5,
  },
  btnMenu: {
    marginLeft:10,
  },
  btMobile: {
    marginLeft: 15,
  }
}));

export default function MenuBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const cours = () => {
    this.props.history.push('/cours')
  }

  const etudiants = () => {
    this.props.history.push('/etudiants')
  }

  const profs = () => {
    window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/profs');
  }

  const promos = () => {
    window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/promos');
  }

  function AdminBar(props) {
    const role = props.role;
    console.log("role "+role);
    if (role === "administrateur") {
      return <Button 
              color="inherit" 
              className={classes.btnMenu}
              href='/admin'>
                Administration</Button>;
    }
    else {
      return <div></div>;
    }
  }

  const disconnect = () => {
    console.log("disconnected");
    localStorage.setItem('user_id', null); 
    localStorage.setItem('user_token', null);
    localStorage.setItem('user_role', null);

    window.location.reload();
  };

  const myAccount = () => {
    window.location.replace(window.location.protocol + '//' + window.location.hostname + ':3000/moncompte');
  }

  const menuId = 'primary-search-account-menu';


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
          <Button 
            aria-label="" 
            color="inherit"
            href='/cours'
            
            >
              <PeopleIcon  />
          
          <p className={classes.btMobile}>Liste des cours</p>
          </Button>
        
      </MenuItem>
      <MenuItem>
        <Button 
            aria-label="" 
            color="inherit"
            href='/admin'
            >
              <PeopleIcon />
          
          <p className={classes.btMobile}>Administration</p>
          </Button>
      </MenuItem>
      <MenuItem onClick={disconnect}>
        <Button
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        
          <p className={classes.btMobile}>Déconnexion</p>
          </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
        <Avatar alt="wito logo" src="https://i.imgur.com/smwWWgt.png" className={classes.bigAvatar} />
        
            <Typography className={classes.title} variant="h6" noWrap>
                WITO
            </Typography>

          <div className={classes.sectionDesktop}>
            <Button color="inherit" className={classes.btnMenu} href='/cours'>Liste des Cours</Button>
            <AdminBar role={localStorage.getItem("user_role")} />
          </div>
          
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Recherche..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={myAccount}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton
              className={classes.disco}
              edge="end"
              aria-label="disconnect"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={disconnect}
              color="inherit"
            >
              <Disconnect />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
