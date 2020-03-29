import React from 'react';
import logo from './img/logo.png';
import './App.css';
import SignIn from "./Components/Login/Connexion"
import {Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SignUp from "./Components/Login/Inscription.js";


function App() {
  return (
      <SignIn></SignIn>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
