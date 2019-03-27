import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contactdata from '../Checkout/ContactData/ContactData';

import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {
    // state={
    //     ingredients:null,
    //     totalPrice:0
    //     }
    

    checkoutCancelledHandler =()=>{
        this.props.history.goBack();
    }

    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    // componentWillMount(){
    //     // console.log(this.props)
    //     // console.log(this.state.ingredients)

    //     const ing={};

    //     const parm=new URLSearchParams(this.props.location.search);
    //     for(let i of parm.entries()){
    //         // console.log(i); //["bacon", "0"] 

    //         if(i[0]==='price'){
    //             this.setState({totalPrice:i[1]})
    //         }
    //         else{
    //             ing[i[0]] = +i[1];
    //         }
    //     }

    //     this.setState(
    //         {ingredients :ing}
    //     )

    // }


    render(){
        let  summary = <Redirect to= '/'/>
        // console.log('purchased : ', this.props.purchased)
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = 
            <div>
                {purchasedRedirect}
                {/* {this.props.isAuth? */}
                <CheckoutSummary ingredients= {this.props.ings} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinueHandler}/>
                    {/* : <p>Please login</p> */}
                {/* } */}
                {/* <Route path={this.props.match.url + '/contact-data' } component={Contactdata}/> */}
                <Route path={this.props.match.url + '/contact-data' } 
                        component ={Contactdata}/>
                      {/* render={()=>(<Contactdata ingredients={this.props.ings} totalPrice={this.props.totPrice}/>)} /> */}

            </div>
        }    
        return summary
        
    }
}

const mapStateToProps =state=>{
    return({
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
        isAuth: state.auth.idToken !==null
    })
}
export default connect(mapStateToProps)(Checkout);