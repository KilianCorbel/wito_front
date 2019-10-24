import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import TableGestionCours from '../ModalMain/TableGestionCours';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <Navbar/>
                </div>
                <br/>
                <div align="center">
                    <TableGestionCours/>
                </div>
                
           </div>
        
        );
    }
}
export default MainWindow;