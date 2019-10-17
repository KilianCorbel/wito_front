import React, { Component } from 'react';
import {Navbar} from './Components/Navbar/Navbar.js';
import {ModalMain} from './Components/ModalMain/ModalMain.js';
import {withRouter} from "react-router-dom";

class MainWindow extends Component {
    render() {
        return(
            <Navbar> 
             <ModalMain/>
            </Navbar>
            
           

        );
    }
}
export default withRouter(MainWindow);