import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer',()=>{
    it('initial stage ',()=>{
        expect(reducer(undefined,{})).toEqual({
            loading:false,
            error:null,
            localId:null,
            idToken:null,
            authRedirectUrl : '/'
        })
    })
    it('store token upon login',()=>{
        expect(reducer({    
                loading:false,
                error:null,
                localId:null,
                idToken:null,
                authRedirectUrl : '/'},
                
                {type: actionTypes.AUTH_SUCCESS,
                idToken:'some-token',
                localId:'some-userid'   
                }
            )).toEqual({
                loading:false,
                error:null,
                idToken:'some-token',
                localId:'some-userid'  ,
                authRedirectUrl : '/'
            })
    })
})