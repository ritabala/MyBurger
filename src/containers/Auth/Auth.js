import React ,{Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import * as actionTypes from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility';

class Auth extends Component{
    state={
        authForm :{
            email:{
                elementType: 'input',
                elementConfiq:{
                    type: 'email',
                    placeholder:'enter email address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                isValid:false,
                touched:false,
                errorMessage:''
            },
            password:{
                elementType: 'input',
                elementConfiq:{
                    type: 'password',
                    placeholder:'enter your password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                isValid:false,
                touched:false,
                errorMessage:''
            }
        },
        isFormValid:false,
        isSignIn: false
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
    //         if(rules.isEmail===true && valid){
    //             const pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //             valid = pattern.test(value);
    //             if (valid === false){
    //                 errorMessage = "invalid email";
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
    onChangeHandler = (event,id)=>{
        // const updatedForm={...this.state.authForm}
        // // console.log(updatedForm)
        // const updatedFormValue ={...this.state.authForm[id]}
        // updatedFormValue.value = event.target.value
        // let errData ={};
        // errData=this.checkValidity(updatedFormValue.value,updatedFormValue.validation)
        // // console.log(errData)
        // if(errData){
        //     updatedFormValue.isValid=errData.valid
        //     updatedFormValue.errorMessage = errData.errorMessage
        // }
        // updatedFormValue.touched=true
        // updatedForm[id]=updatedFormValue
        // console.log('updatedFormValue : ' ,updatedFormValue)

        const updatedFormValue = updateObject(this.state.authForm[id],{
            value: event.target.value,
            isValid: checkValidity(event.target.value,this.state.authForm[id].validation).valid,
            errorMessage:checkValidity(event.target.value,this.state.authForm[id].validation).errorMessage,
            touched:true
        })

        const updatedForm = updateObject(this.state.authForm,{
            [id]:updatedFormValue
        })


        let formIsValid = true;
        for(let item in updatedForm){
            formIsValid=formIsValid && updatedForm[item].isValid
        }

        this.setState({
            authForm:updatedForm,
            isFormValid:formIsValid
        })

        // console.log(this.state.isFormValid)
    }
    clickHandler =(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value,this.state.authForm.password.value,this.state.isSignIn)
    
    }

    switchModeHandler =()=>{
        this.setState(prevState=>{
            return{
                isSignIn:!prevState.isSignIn
            }
        })
        // console.log(this.state.isSignIn)
    }

    componentDidMount =()=>{
        // console.log(this.props.buildingBurger )
        // console.log(this.props.authRedirectUrl)
        if(!this.props.buildingBurger && this.props.authRedirectUrl!=='/'){
            this.props.onsetRedirectPath()
        }
    }
    render(){
        let formArray =[];
        formArray = Object.keys(this.state.authForm).map((p)=>{
            return(
                {   
                    id:p,
                    data:this.state.authForm[p]
                }
            )
        })
        // console.log(formArray);
        let form ='';
        // console.log('in auth container',this.props.loading)
        if(this.props.loading){
            form = <Spinner/>
        }
        else{
        form=formArray.map((p)=>{
            return <Input
                         key={p.id} 
                         elementtype={p.data.elementType}
                         elementconfiq={p.data.elementConfiq}
                         value={p.data.value}
                         changed={(event)=>this.onChangeHandler(event,p.id)}
                         touched={p.data.touched}
                         errorMessage={p.data.errorMessage}
                         valid={p.data.isValid}
            />
        })}

        let errMessage=''
        if(this.props.error){
             errMessage = this.props.error
        }
        let authRedirect=''
        if(this.props.isAuth){
            console.log(this.props.authRedirectUrl)
            authRedirect=<Redirect to={this.props.authRedirectUrl}/>
        }
        return(
                <div className={classes.Auth}>
                    <h3>Enter your credentials</h3>
                    {errMessage}
                    {authRedirect}
                    <form onSubmit={this.clickHandler}>
                        {form}
                        <Button btntype="Success" >Submit</Button>
                    </form>
                    <Button btntype="Danger" clicked={this.switchModeHandler}>SWITCH TO {!this.state.isSignIn?'SIGN-IN':'SIGN-UP'}</Button>
                </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.idToken!==null,
        authRedirectUrl : state.auth.authRedirectUrl,
        buildingBurger : state.burgerBuilder.burgerBuilding
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth:(email,password,isSignIn)=>dispatch(actionTypes.auth(email,password,isSignIn))  ,  
        onsetRedirectPath : ()=>dispatch(actionTypes.authRedirectUrl('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);