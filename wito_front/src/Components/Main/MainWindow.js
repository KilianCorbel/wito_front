import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import ModalMain from '../ModalMain/ModalMain';

class MainWindow extends Component {
    render() {
        return(
           <div>
               <div>
                    <Navbar/> 
                </div>
                <div>
                    <ModalMain/> 
                </div>
           </div>
        
        );
    }
}
export default MainWindow;