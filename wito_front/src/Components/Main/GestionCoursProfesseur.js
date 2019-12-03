import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import TableGestionCoursProfesseur from '../ModalMain/TableGestionCoursProfesseur';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <Navbar/>
                </div>
                <br/>
                <div align="center">
                    <TableGestionCoursProfesseur/>
                </div>
                
           </div>
        
        );
    }
}
export default MainWindow;