import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios.order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import {updateObject,checkValidity} from '../../../shared/utility';

class Contactdata extends Component{

    state={      
        orderForm: {
            name: {
                elementtype:'input',
                elementconfiq:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:4
                },
                isValid: false,
                errorMessage:'',
                touched: false
            },
            email:{
                elementtype:'input',
                elementconfiq:{
                    type:'email',
                    placeholder:'Your email'
                },
                value:'' ,
                validation:{
                    required:true
                },
                isValid: false,
                errorMessage:'',
                touched: false    
            },
            street: {
                elementtype:'input',
                elementconfiq:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid: false,
                errorMessage:'',
                touched: false
            },
            country:{
                elementtype:'input',
                elementconfiq:{
                    type:'text',
                    placeholder:'Country'
                
                },
                value:'',
                validation:{
                    required:true
                },
                isValid: false,
                errorMessage:'',
                touched: false
            },
            postalCode: {
                elementtype: 'input',
                elementconfiq: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                isValid: false,
                errorMessage:'',
                touched: false
            },
            deliveryMethod: {
                elementtype: 'select',
                elementconfiq: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                isValid: true,
                errorMessage:'',
                touched: false
            }
        },
        // loading: false,
        isFormValid:false
    }
    
    // checkValidity =(value,rules)=>{
    //     let valid=true;
    //     let errorMessage ='';
    //     if(rules) {
    //         if(rules.required===true && valid){
    //             valid = value.trim()!=='';
    //             if (valid === false){
    //                 errorMessage = "value is required";
    //             }
    //         }
    //         if(rules.minLength && valid){
    //             valid = value.trim().length >= rules.minLength;
    //             if (valid === false){
    //             errorMessage = "minimun length should be : " + rules.minLength ;
    //         }}

    //         if(rules.maxLength && valid){
    //             valid= value.trim().length<=rules.maxLength;
    //             if (valid === false){
    //             errorMessage = "exceeds maximum length : " + rules.maxLength ;
    //         }}
    //     }
    //     return {valid , errorMessage};
    // }

    onChangeHandler=(event,id)=>{
//         const updatedForm = {...this.state.orderForm}; 
//         const updatedFormValue = {...updatedForm[id]}  //name
// console.log(updatedFormValue)
//         updatedFormValue.value=event.target.value
//         let errData ={};
//         errData = this.checkValidity(updatedFormValue.value,updatedFormValue.validation);
        
//         if(errData){
//             updatedFormValue.isValid=errData.valid
//             updatedFormValue.errorMessage=errData.errorMessage
//         }
//         updatedFormValue.touched=true

//         updatedForm[id] = updatedFormValue //new change value of 'value' obj , other elementconfiq will be same as before

////////
        const updatedFormValue = updateObject(this.state.orderForm[id],{
            value:event.target.value,
            isValid:checkValidity(event.target.value,this.state.orderForm[id].validation).valid,
            errorMessage:checkValidity(event.target.value,this.state.orderForm[id].validation).errorMessage,
            touched:true
        })

        const updatedForm= updateObject(this.state.orderForm,{
            [id]:updatedFormValue
        })
///////       
        let formIsValid=true;
        for(let item in updatedForm ){
            formIsValid = updatedForm[item].isValid  && formIsValid
        }
        this.setState({
            orderForm : updatedForm,
            isFormValid: formIsValid
        })

    }

    placeOrderHandler=(event)=>{
        event.preventDefault();
        // this.setState({
        //     loading: true
        // })

        const formData = {};
        for(let item in this.state.orderForm){
            formData[item] = this.state.orderForm[item].value
        }
    
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.totPrice,
            orderData : formData,
            userId:this.props.userId
        }

        this.props.placeOrderFromReducer(order,this.props.token);
        


    }    

    ComponentWillUnmount(){
        console.log('in unmount')
    }

    render(){
        let orderFormArray=[];
        for(let item in this.state.orderForm){
            orderFormArray.push({   
                id:item,
                confiq:this.state.orderForm[item],

            })
        }

        let inputElements = 
            orderFormArray.map((item)=>{
                // console.log(item)
                return  (
                    <Input 
                        key={item.id}
                        elementtype={item.confiq.elementtype}
                        elementconfiq={item.confiq.elementconfiq}
                        value={item.confiq.value}
                        valid={item.confiq.isValid}
                        touched={item.confiq.touched}
                        errorMessage={item.confiq.errorMessage}
                        changed={(event)=>this.onChangeHandler(event,item.id)}
                    />
                )
            })

        let form = '';

        if (this.props.loading){
            form=<Spinner/>}
        else {
            form =           
                <form>
                    {inputElements}
                    <Button btntype="Success" clicked={this.placeOrderHandler} disabled={this.state.isFormValid?false : true}>Place Order</Button>
                </form>   
        }

        return(
            <div className={classes.ContactData}>
                <h3>Enter your Contact data</h3>
                {form}
                    {/* <input className={classes.Input} type="text" value="Your Name" name='name' />
                    <input className={classes.Input} type="text" value="Your Email" name='email' />
                    <input  className={classes.Input} type="text" value="Your Street" name='street' />
                    <input  className={classes.Input} type="text" value="Your Postal code" name='postalCode' />
                    <Button btntype="Success" clicked={this.placeOrderHandler}>Place Order</Button> */}
                {/* </form> */}
            </div>   
        )
    }    
}

const mapStateToProps =state=>{
    return({
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token:state.auth.idToken,
        userId : state.auth.localId
    })
}

const mapDispatchToProps = dispatch =>{
    return({
        placeOrderFromReducer : (orderData,token)=>dispatch(actionCreators.placeOrder(orderData,token))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(Contactdata,axios)));