import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import GestionPromos from '../ModalMain/GestionPromos';

class GestionPromotions extends Component {
    render() {
        return(
           <div>
               <div>
                    <Navbar/>
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