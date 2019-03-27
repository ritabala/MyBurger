import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState ={
    ingredients: null,
    error: false,
    // {
    //     salad:0,
    //     bacon:0,
    //     cheese:0,
    //     meat:0
    // },
    totalPrice : 4,
    burgerBuilding : false
}

const INGREDIENT_PRICES = {
    salad:.5,
    meat:1.2,
    bacon:2,
    cheese:1
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: {
            const ing = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
            const updIng = updateObject(state.ingredients, ing )
            const combineProp1 ={
                ingredients:updIng,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]    ,
                burgerBuilding : true 
            }
            return updateObject(state,combineProp1);
            // return({
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName] : state.ingredients[action.ingredientName] + 1  //salad:2
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]     
                
            // })
        }
        case actionTypes.REMOVE_INGREDIENT:{
            const ing2 = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
            const updIng2 = updateObject(state.ingredients, ing2 )
            const combineProp2 ={
                ingredients:updIng2,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]  ,
                burgerBuilding : true    
            }
            return updateObject(state,combineProp2);
            // return({
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]     

            // })
        }
        case actionTypes.SET_INGREDIENTS:{
            return({
                ...state,
                // ingredients: action.ingredients,
                ingredients:{                                 /// for order as db orders ing alphabetically
                    salad : action.ingredients.salad,
                    bacon : action.ingredients.bacon,
                    cheese : action.ingredients.cheese,
                    meat : action.ingredients.meat
                },
                totalPrice : 4,
                error: false,
                burgerBuilding : false
            })
            
        }  
        case actionTypes.ING_FETCH_FAILED:{
            // return({
            //     ...state,
            //     error: action.error
            // })
            return updateObject(state,{ error:action.error});

        }  
        
        default: return state;
    }
}

export default reducer;
