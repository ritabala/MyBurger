import * as  actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    loading:false,
    error:null,
    localId:null,
    idToken:null,
    authRedirectUrl : '/'
}

const authStart = (state,action)=>{
    // console.log(state)
    return updateObject(state,{loading:true} );
}

const authSuccess = (state,action)=>{
    // console.log(action)
    return updateObject(state,{
    localId:action.localId,
    idToken:action.idToken,
    loading:false,
    error:null
})
}

const authFail = (state,action)=>{
    return updateObject(state,
        {error:action.err,
        loading:false})
}
const logOut = (state,action)=>{
    return updateObject(state,{
        idToken:null,
        localId:null
    })
}

const authRedirectUrl=(state,action)=>{
    return updateObject(state,{
        authRedirectUrl: action.url
    })
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_SUCCESS : return authSuccess(state,action)
        case actionTypes.AUTH_START: return authStart(state,action)
        case actionTypes.AUTH_FAIL:return authFail(state,action)
        case actionTypes.LOG_OUT:return logOut(state,action)
        case actionTypes.AUTH_REDIRECT_URL:return authRedirectUrl(state,action)
        default:{
            return state
        }    
    }
}

export default reducer;