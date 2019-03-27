import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import {withRouter} from 'react-router-dom';

const checkoutSummary = (props)=>{
    // console.log(props)

    return(
        <div className={classes.CheckoutSummary}>
            <h3>Your burger looks yummy!!</h3>
            <Burger ingredients= {props.ingredients}/>
            <Button btntype='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btntype="Success" clicked={props.checkoutContinued}>CONTINUE</Button>

        </div>
    )
}

export default withRouter(checkoutSummary);