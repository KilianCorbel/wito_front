import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import TableGestionCours from '../ModalMain/TableGestionCours';
import GestionProfs from '../ModalMain/GestionProfs';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <Navbar/>
                </div>
                <br/>
                <div align="center">
                    <GestionProfs />
                </div>
                
           </div>
        
        );
    }
}
export default MainWindow;