import React, { Component } from 'react';
import ValiderEtudiant from '../ModalMain/ValiderEtudiant';
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
                    <ValiderEtudiant />
                </div>
           </div>
        
        );
    }
}
export default MainWindow;