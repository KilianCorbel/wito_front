import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import ModalMain from '../ModalMain/ModalMain';
import TableMain from '../ModalMain/TableMain';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <Navbar/> 
                </div>
                <br/>
                <div align="center">
                    <TableMain/>
                </div>
                <div align="center">
                    <ModalMain/> 
                </div>
           </div>
        
        );
    }
}
export default MainWindow;