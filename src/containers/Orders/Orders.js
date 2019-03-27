import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios.order';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component{

    // getOrderHandler = ()=>{
// state={
//     hasData:false,
//     orders:[]
// }        

componentDidMount(){ 
    // console.log('in did mount of orders')
    this.props.fetchOrder(this.props.token,this.props.userId);
//         axios.get('order.json')
//         .then(
//             response=>{
//                 console.log(response);
//                 const order = Object.keys(response.data)
//                 .map((item)=>{
//                     return response.data[item]
//                 }); //array of object values


//                 // const arr=[];
//                 // for(let key in response.data){
//                 //     arr.push({
//                 //         ...response.data[key],
//                 //         id:key //for firebase id
//                 //     })
//                 // }

//                 console.log(order)
//                 this.setState({
//                     hasData:true,
//                     orders:order
//                 })
//             }
//         )
//         .catch(
//             err=>{
//                 this.setState({
//                     hasData:true
//                 })
//             }
//         )
    }

    render(){
       
        // let i=0;
        // let individualOrder = '';

        // if(this.props.hasData)
        // console.log('outside : ',this.props.orders)

        // if(!this.props.loading)
        // {
        //     if (this.props.orders.length !== 0){
        //         console.log('orders exists : ' ,this.props.orders) 
        //         individualOrder = this.props.orders.map((p)=>{
        //            i++;
        //            console.log(p.ingredients)
        //             return <Order key={i} ingredients={p.ingredients} totalPrice={p.totalPrice}/>
        //         })
        //     }
        //     if (this.props.orders.length === 0){
        //         console.log('orders do not exists : ' ,this.props.orders) 
        //         return <h3 style={{'textAlign': 'center'}}>NO ORDERS PLACED TILL NOW</h3>
        //     }
            
        // }
        // else{
        //     individualOrder =<Spinner/>
        // }
        // this.props.fetchOrder(this.props.token,this.props.userId);

        let individualOrder =<Spinner/>
        if(!this.props.loading){
            // console.log(this.props.orders)
            individualOrder = this.props.orders.map((p,index)=>{
                return(
                    <Order  key={index} 
                    ingredients={p.ingredients} 
                    totalPrice={p.totalPrice}/>
                )
            })
            // console.log(this.props.orders)
            if (this.props.orders.length === 0){
                // console.log('orders do not exists : ' ,this.props.orders) 
                return <h3 style={{'textAlign': 'center'}}>NO ORDERS PLACED TILL NOW</h3>
            }
            
        }
        return(
           <Aux>
              {individualOrder}
           </Aux> 


        );
    }
}

const mapStateToProps = state=>{
    return({
        orders: state.order.order,
        // hasData:state.order.hasData,
        loading:state.order.loading,
        token:state.auth.idToken ,
        userId:state.auth.localId   })
}

const mapDispatchToProps = dispatch =>{
    return({
        fetchOrder : (token,userId)=>{dispatch(actionCreators.fetchOrdersInit(token,userId))}
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));