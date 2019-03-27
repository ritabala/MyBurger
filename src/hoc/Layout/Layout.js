import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/auth';


class Layout extends Component
{
    state={
        showSidebar:false
    }
        
    hideSidebarHandler = () => {
        this.setState({
            showSidebar:false
        }
        )
    }

    toggleSidebarHandler = () =>{
        this.setState((prevState)=>{
            return {
                showSidebar:!(prevState.showSidebar)
            }
        })
    }

    // componentWillUpdate = (nextProps,nextState)=>{
    //     console.log('in component update of layout');

    // }


    render(){
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} toggleSidebar={this.toggleSidebarHandler}/>  
                <Sidebar isAuth={this.props.isAuthenticated} open={this.state.showSidebar} closed={this.hideSidebarHandler}/>
                <main className ={classes.Content}>
                    {this.props.children}
                </main>
            </Aux> 
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        isAuthenticated : state.auth.idToken !==null
    }
}
export default connect(mapStateToProps)(Layout);