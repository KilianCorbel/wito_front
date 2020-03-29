import React, { Component } from 'react';
import Refuse from '../ModalMain/AccesRefuse';
import MenuBar from '../Navbar/Menu';

class AccesRefuse extends Component {
    

    render() {
        return(
           <div>
               <div>
                    <MenuBar/> 
                </div>
                <br/>
                <div align="center">
                    <Refuse/>
                </div>
           </div>
        
        );
    }
}
export default AccesRefuse;