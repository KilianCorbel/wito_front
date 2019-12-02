import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import ModalMain from '../ModalMain/ModalMain';
import TableMain from '../ModalMain/TableMain';
import MenuBar from '../Navbar/Menu';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <MenuBar/> 
                </div>
                <br/>
                <div align="center">
                    <TableMain/>
                </div>
                <br/>
                <div align="center">
                    <ModalMain/> 
                </div>
           </div>
        
        );
    }
}
export default MainWindow;