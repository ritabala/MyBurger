import React ,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.order';
// import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';

import * as actionCreators from '../../store/actions/index';
// const INGREDIENT_PRICES = {
//     salad:.5,
//     meat:1.2,
//     bacon:2,
//     cheese:1
// }

export class BurgerBuilder extends Component {
    // constructor(){
    //     super(props);
    //     state={
    //         ingredients:{

    //         }
    //     }
    // }

    state={
        // ingredients: null,
        // {
        //     // salad:0,
        //     // meat:0,
        //     // bacon:0,
        //     // cheese:0
        // },
        // totalPrice : 4,
        // purchasable: false,
        ordered: false,
        loading: false
        // error:false
    }

    updatePurchaseState = (ingredients) => {
        const purchase = Object.keys(ingredients)
            .map((iKey)=>{
                return(
                    ingredients[iKey]
                )
            })
            .reduce((arr,ele) =>{ return (arr=arr + ele)},0)

        // this.setState({
        //     purchasable : purchase>0
        //     })

           return(purchase>0) 
    }


    orderClickedHandler = () =>{
        if(this.props.isAuth){
            this.setState({
                ordered:true
            })
        }
        else{
            this.props.authRedirectUrl('/checkout')
            this.props.history.push('/auth')
        }
    }

    removeModalHandler = () => {
        this.setState(
            {
                ordered: false
            }
        )
    }

    placeOrderHandler = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout');
        // console.log(this.props);
        // const arr =[];
        // for(let i in this.props.ing){       //for..in : used with objects
        //     arr.push(encodeURIComponent(i) +'='+encodeURIComponent(this.props.ing[i])); //search: ?salad=1
        // }
        // arr.push('price=' + this.state.totalPrice);

        // const str = arr.join('&');

        // this.props.history.push({
        //     pathname:  '/checkout',
        //     search: '?' + str
        // });

 
    //             // alert('Continue to place order!!');
    
    }

    
    componentDidMount(){
        // console.log('in did mount')
        this.props.initIngredients();
    }

    render(){
        // console.log(this.props)
        const disabledInfo = {
            ...this.props.ing
        };
        

        // console.log(this.state.loading);


        let orderSummary = null;
        let burger= this.props.error?'ingredients cant be loaded':<Spinner/>

        if(this.props.ing)
        {   burger = 
            <Aux>
                <div>
                    <Burger ingredients= {this.props.ing}/>
                </div> 
                <div>
                    <BuildControls ingredientAdded={this.props.addIngredient} 
                    ingredientDeleted={this.props.removeIngredient}
                    disabled={disabledInfo}
                    price={this.props.totPrice}
                    // purchasable={!this.state.purchasable}
                    purchasable={this.updatePurchaseState(this.props.ing)}
                    ordered={this.orderClickedHandler}
                    isAuth={this.props.isAuth}
                    />
                </div>
            </Aux>
            if (this.state.loading){
                 orderSummary = <Spinner/>
            }
            orderSummary = <OrderSummary ingredients={this.props.ing} 
                price={this.props.totPrice}
                orderCancel={this.removeModalHandler} 
                orderContinue={this.placeOrderHandler}/>;

        }

        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key]<=0)
        }
        return(
            <Aux>
                <Modal show={this.state.ordered} clicked={this.removeModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
            
        );
    }
}

const mapStateToProps =(state)=>{
    return({
        ing : state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased : state.order.purchased,
        isAuth: state.auth.idToken !==null
    })
}

const mapDispatchToProps =(dispatch)=>{
    return({
        addIngredient : (ingName)=>dispatch(actionCreators.addIngredients(ingName)),
        removeIngredient : (ingName)=>dispatch(actionCreators.removeIngredients(ingName)),
        initIngredients : ()=>dispatch(actionCreators.initIngredients()),
        purchaseInit : ()=>dispatch(actionCreators.purchaseInit()),
        authRedirectUrl : (path)=>dispatch(actionCreators.authRedirectUrl(path))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));