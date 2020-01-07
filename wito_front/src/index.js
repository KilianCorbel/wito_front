import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import SignIn from './Components/Login/Connexion';
import SignUp from './Components/Login/Inscription';
import truc from './Components/Main/MainWindow';
import gestionCours from './Components/Main/GestionCours';
import feuilleAppel from './Components/Main/FeuilleAppel';
import GestionPromos from './Components/Main/GestionPromos';
import GestionProfs from './Components/Main/GestionProfs';
import signature from './Components/Main/Signature';
//import ModalMain from './Components/ModalMain/ModalMain';

const routing = (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/cours" component={truc}/>
            <Route path="/gestionCours" component={gestionCours}/>
            <Route path="/feuilleAppel" component={feuilleAppel}/>
            <Route path="/signature" component={signature}/>
            <Route path='/promos' component={GestionPromos} />
            <Route path='/profs' component={GestionProfs} />
            />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
