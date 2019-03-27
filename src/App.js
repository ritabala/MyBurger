import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/index';
// import Contactdata from './containers/Checkout/ContactData/ContactData';
import asyncComponent from './hoc/asyncComponent/AsyncComponent';

const authAsync = asyncComponent(()=>{
  return import ('./containers/Auth/Auth')
});
const ordersAsync = asyncComponent(()=>{
  return import ('./containers/Orders/Orders')
});
const checkoutAsync = asyncComponent(()=>{
  return import ('./containers/Checkout/Checkout')
});

class App extends Component {
  // state={
  //   error:false
  // }

  componentDidMount(){
    this.props.onTryAutoSignUp();
    // setTimeout(()=>{
    //   this.setState({error:true})
    // },5000);
  }
  render() {
    let routes =(
      <Switch>
        {/* <Route path='/auth' component={Auth} /> */}
        <Route path='/auth' component={authAsync} />

        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if(this.props.isAuth){
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={Checkout} /> */}
          <Route path="/checkout" component={checkoutAsync} />
          {/* <Route path="/orders" component={Orders} /> */}
          <Route path="/orders" component={ordersAsync} />
          <Route path='/logout' component={Logout} />
          {/* <Route path='/auth' component={Auth} /> */}
          <Route path='/auth' component={authAsync} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
            {/* <BurgerBuilder/> */}
        {/* { this.state.error? null: <BurgerBuilder/>} */}
          {/* <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} /> */}
          {/* <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/my-orders" component={this.props.isAuth? Orders : null}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/logout' component={Logout}/>
            <Route path="/"  component={BurgerBuilder} />
          </Switch> */}
          {routes}
        </Layout>
        
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    isAuth : state.auth.localId!==null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp : ()=>dispatch(actionCreators.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
