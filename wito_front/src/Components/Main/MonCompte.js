import React, { Component } from 'react';
import MonCompte from '../ModalMain/MonCompte';
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
                    <MonCompte />
                </div>
           </div>
        
        );
    }
}
export default MainWindow;