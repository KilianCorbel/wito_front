import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import SignIn from './Components/Login/Connexion';
import SignUp from './Components/Login/Inscription';
import truc from './Components/Main/MainWindow';
import feuilleAppel from './Components/Main/FeuilleAppel';
import GestionPromos from './Components/Main/GestionPromos';
import GestionProfs from './Components/Main/GestionProfs';
import GestionEtudiant from './Components/Main/GestionEtudiant';
import signature from './Components/Main/Signature';
import GestionEtudiants from './Components/Main/GestionEtudiant';
import Administration from './Components/Main/Administration';
import MonCompte from './Components/Main/MonCompte';
import ValiderEtudiant from './Components/Main/ValiderEtudiant';
import AccesRefuse from './Components/Main/AccesRefuse';

const routing = (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/cours" component={truc}/>
            <Route path="/feuilleAppel" component={feuilleAppel}/>
            <Route path="/signature" component={signature}/>
            <Route path='/promos' component={GestionPromos} />
            <Route path='/profs' component={GestionProfs} />
            <Route path='/etudiants' component={GestionEtudiants} />
            <Route path='/admin' component={Administration} />
            <Route path='/moncompte' component={MonCompte} />
            <Route path='/validation' component={ValiderEtudiant} />
            <Route path='/accesrefuse' component={AccesRefuse} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
