import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
// import imgLogo from '../../../assets/Images/burger-logo.png';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';

const toolbar = (props) => {
    // console.log(props.isAuth)
    return(
        <header className={classes.Toolbar}>
            <SidebarToggle toggleSidebar={props.toggleSidebar}/>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}
export default toolbar;