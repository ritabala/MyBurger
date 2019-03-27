import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const usedIngredients = Object.keys(props.ingredients)
        .map((iKey)=>{
            return(
                <li key={iKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {iKey} : {props.ingredients[iKey]}
                    </span>
                </li>
            )
        })
    return(
            <Aux>
                <h3>Order Summary </h3>
                <p>Your delicious order contains the below ingredients : </p>
                <ul>
                    {usedIngredients}
                </ul>
                <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
                <p>Proceed to Checkout?</p>
                <Button btntype={'Danger'} clicked={props.orderCancel}> CANCEL</Button>
                <Button btntype={'Success'} clicked={props.orderContinue} > CONTINUE</Button>
            </Aux>
    )
   
}

export default orderSummary;