import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './Sidebar.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sidebar = (props) => {

    let assignedClass = [classes.Sidebar,classes.Close]
    if (props.open){
         assignedClass= [classes.Sidebar,classes.Open]
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={assignedClass.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>                    
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
        
        
    )
}

export default sidebar;
