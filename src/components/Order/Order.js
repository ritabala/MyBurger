import React from 'react';
import classes from './Order.css';

const order =(props)=>{
// console.log(props)
    const ing = Object.keys(props.ingredients)
        .map((item)=>{
            return (item +' : ' + props.ingredients[item] +' ')
        })

        ing.join(' ');

    return(
        <div className={classes.Order}>
            <p>Ingredients : <strong>{ing} </strong></p>
            <p>Price : <strong>USD {parseFloat(props.totalPrice).toFixed(2)}</strong></p>
        </div>
    )
}



export default order;