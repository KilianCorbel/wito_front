import React, { Component } from 'react';
import Administration from '../ModalMain/Administration';
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
                    <Administration/>
                </div>
           </div>
        
        );
    }
}
export default MainWindow;