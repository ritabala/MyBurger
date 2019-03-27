import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios.order';

export const addIngredients = (ingName)=>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : ingName}
}

export const removeIngredients = (ingName)=>{
    return{
        type :  actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingName}
}

export const setIngredients = ing =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients : ing
    }
}

export const ingFetchFailed = (err)=>{
    return{
        type: actionTypes.ING_FETCH_FAILED,
        error: err
    }
}

export const initIngredients =()=>{
    return dispatch =>{
        axios.get('/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data))
        }
        )
        .catch(
            error => {
               dispatch(ingFetchFailed(error))
                })
            }
    }
