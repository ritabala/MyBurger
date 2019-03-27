import * as actionTypes from './actionTypes';
import axios from '../../axios.order';

export const placeOrderSuccess = (id,orderData) =>{
    return({
        type : actionTypes.PLACE_ORDER_SUCCESS,
        orderId : id,
        orderData : orderData
    })
}


export const placeOrderError = (error) =>{
    return({
        type : actionTypes.PLACE_ORDER_ERROR,
        error : error
    })
}

export const placeOrderStart = () =>{
    return({
        type : actionTypes.PLACE_ORDER_START
    })
}

export const placeOrder = (order,token) =>{
    // console.log(historyProps)
    return dispatch=>{
        dispatch(placeOrderStart());
        axios.post('/order.json?auth='+token, order)
            .then(response => {
                // console.log('response of place order : ', response.data)  //response is id
                // console.log(order)
                // this.props.history.push('/my-orders');
                dispatch(placeOrderSuccess(response.data,order))
                // historyProps.match.url('/');
            })
            .catch(error => {
                dispatch(placeOrderError(error));
            })
}}


export const purchaseInit = ()=>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
} 

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrdersSuccess = (response) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        res :response
    }
}

export const fetchOrdersError = () => {
    return{
        type: actionTypes.FETCH_ORDERS_ERROR
    }
}

export const fetchOrdersInit = (token,userId) =>{
    return dispatch =>{
        // console.log(token)
        dispatch(fetchOrdersStart()); //remove
        const queryParams = '?auth='+token +'&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/order.json'+ queryParams)
        .then(
            response=>{
                // console.log('response is : ' ,response);
                dispatch(fetchOrdersSuccess(response)) 
            
    })
    .catch(err=>{
        // console.log(err)
        dispatch(fetchOrdersError())
    })
}
}