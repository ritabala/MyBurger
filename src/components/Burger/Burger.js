import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props)=>
{   
    // console.log(props.ingredients);
    // console.log(Object.keys(props.ingredients));
    let transformedIngredients=Object.keys(props.ingredients)
        .map(igKey=>{
            // console.log([...Array(props.ingredients[igKey])]);
            return [...Array(props.ingredients[igKey])]
            .map((_,i)=>{
                // console.log(igKey);
                // console.log(igKey+i);
                return <BurgerIngredient type={igKey} key={igKey+i}/>;
            })
        })
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[])

        // console.log(transformedIngredients);

        if (transformedIngredients.length===0){
            transformedIngredients = <div>Please enter the ingredients!!</div>
        }

        
    
    return(
    <div className={classes.Burger}>        
        <BurgerIngredient type='Bread-Top'/>
            {transformedIngredients}
        <BurgerIngredient type='Bread-Bottom'/>
    </div>
    );
}

export default burger;