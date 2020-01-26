import React, { Component } from 'react';
import ModalMain from '../ModalMain/ModalMain';
import TableMain from '../ModalMain/TableMain';
import MenuBar from '../Navbar/Menu';


function DisplayModal(props) {
    const role = props.role;
    console.log("role "+role);
    if (role == "professeur") {
        return <ModalMain />;
    }
    else {
        return <div></div>;
    }
}

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
                    <DisplayModal role={localStorage.getItem("user_role")} />          
                </div>
           </div>
        
        );
    }
}
export default MainWindow;