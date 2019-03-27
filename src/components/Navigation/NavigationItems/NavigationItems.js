import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
// import Aux from '../../../hoc/Auxiliary';

const navigationItems = (props) => {
    // console.log(props)
    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth?<NavigationItem link="/orders">My Orders</NavigationItem> : null}

        {props.isAuth
            ?<NavigationItem link="/logout" exact>LogOut</NavigationItem>
            :<NavigationItem link="/auth" exact>Authenticate</NavigationItem>
        }
    </ul>
)}


export default navigationItems;