import * as  actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    order: [],
    loading: false,
    purchased:false
}

const placeOrderSuccess = (state,action)=>{
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
// console.log('order before place order success', state.order)
    const updState={
        order : state.order.concat(newOrder) ,
        loading:false,
        purchased:true 
    }
                // return ({
            //   ...state ,
            //   order : state.order.concat(newOrder) ,
            //   loading:false,
            //   purchased:true
            // })
    return updateObject(state,updState);
};



const placeOrderErr=(state,action)=>{
          // return({
            //     ...state,
            //     error: action.error
            // })
            return updateObject(state,{error:action.error});
        };

const placeOrderStart = (state,action)=>{
            // {
                // return({
                //     ...state,
                //     loading:true
                // })
                return updateObject(state,{ loading:true});
            // }
        };

const purchaseInit = (state,action) =>{
            // return({
            //     ...state,
            //     purchased:false
            // })
            return updateObject(state,{ purchased:false});
        }             

const fetchOrderSuccess =(state,action)=>{
    let newOrder = [];
            if(action.res.data){
                newOrder=
                Object.keys(action.res.data)
                .map((item)=>{
                    return action.res.data[item]
                }) //array of object values
            }
            // const ord = state.order
            // console.log('order  : ' ,ord)
            // console.log('neworder : ', newOrder)
            // return({
            //     ...state,
            //     order: newOrder,
            //     loading:false
            // })   
            return updateObject(state,{  order: newOrder,  loading:false});
}

        

const fetchOrderError = (state,action) =>{
    // return({
    //     ...state,
    //     loading:false
    // })
    return updateObject(state,{ loading:false});
}

const fetchOrderStart = (state,action) =>{
    // console.log(state);
    // console.log(action)
        // return({
        //     ...state,
        //     loading:true
        // })
        return updateObject(state,{ loading:true});
}                                   
                                

const reducer =(state=initialState,action) =>{
    switch(action.type){
        case actionTypes.PLACE_ORDER_SUCCESS : return placeOrderSuccess(state,action)
        case actionTypes.PLACE_ORDER_ERROR: return placeOrderErr(state,action)
        case actionTypes.PLACE_ORDER_START: return placeOrderStart(state,action)
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state,action)
        case actionTypes.FETCH_ORDERS_ERROR : return fetchOrderError(state,action)
        case actionTypes.FETCH_ORDERS_START : return fetchOrderStart(state,action)
        default:{
            return state;
        }
    }
}

export default reducer;