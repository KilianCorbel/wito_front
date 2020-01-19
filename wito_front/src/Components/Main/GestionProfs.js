import React, { Component } from 'react';
import Menu from '../Navbar/Menu';
import GestionProfs from '../ModalMain/GestionProfs';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <Menu/>
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