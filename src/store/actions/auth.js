import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authFail=(err)=>{
    return({
        type: actionTypes.AUTH_FAIL,
        err:err
    })
}

export const authSuccess=(localId,idToken)=>{
    // console.log(localId)
    return({
        type: actionTypes.AUTH_SUCCESS,
        localId:localId,
        idToken:idToken
    })
}

export const authStart=()=>{
    return({
        type: actionTypes.AUTH_START,
    })
}

export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userid')
    return({
        type: actionTypes.LOG_OUT,
    })
}

export const setTimeoutFn =(expireTime)=>{
    // console.log(expireTime)
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logOut())
        },expireTime * 1000)
    }
}

export const auth=(email,password,isSignin)=>{
    return dispatch =>{
        dispatch(authStart())
    
    const userData={
        email:email,
        password:password,
        returnSecureToken:true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCIvr1DZmeTzpqIVFueOeW3zo4ahdiNxVA';
    if(!isSignin){
       url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCIvr1DZmeTzpqIVFueOeW3zo4ahdiNxVA' 
    }

    axios.post(url,userData)
    .then(response=>{
        // console.log(response.data)
        localStorage.setItem("token", response.data.idToken)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem("expirationDate",expirationDate)
        localStorage.setItem("userid",response.data.localId)
        dispatch(authSuccess(response.data.localId,response.data.idToken))
        dispatch(setTimeoutFn(response.data.expiresIn))
    })
    .catch(err=>{
        dispatch(authFail(err.response.data.error.message))
    })
}}

export const authRedirectUrl = (path)=>{
    return ({
        type: actionTypes.AUTH_REDIRECT_URL,
        url:path
    })
}

export const checkAuthState = ()=>{
    return dispatch => {
        const token = localStorage.getItem('token')
        if(token== null){
            dispatch(logOut())
        }
        else{
            const expirationDate = new Date (localStorage.getItem("expirationDate"))
            if(expirationDate > new Date()){
                const userid = localStorage.getItem("userid");
                dispatch(authSuccess(userid,token));
                const expiryTime = (expirationDate.getTime() - new Date().getTime())/ 1000;
                dispatch(setTimeoutFn(expiryTime));
            }
            else{
                dispatch(logOut())
            }
        }
    }
}