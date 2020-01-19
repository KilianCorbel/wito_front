import React, { Component } from 'react';
import Menu from '../Navbar/Menu';
import GestionPromos from '../ModalMain/GestionPromos';

class GestionPromotions extends Component {
    render() {
        return(
           <div>
               <div>
                    <Menu/>
                </div>
                <br/>
                <div align="center">
                    <GestionPromos />
                </div>
                
           </div>
        
        );
    }
}
export default GestionPromotions;