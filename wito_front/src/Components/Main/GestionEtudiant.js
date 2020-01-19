import React, { Component } from 'react';
import Navbar from '../Navbar/Menu';
import GestionEtudiant from '../ModalMain/GestionEtudiant';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <Navbar/>
                </div>
                <br/>
                <div align="center">
                    <GestionEtudiant />
                </div>
                
           </div>
        
        );
    }
}
export default MainWindow;