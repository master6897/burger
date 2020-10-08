import React from 'react';
import styles from'./Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients).map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_, i) =>{
            return <BurgerIngredient key ={igKey + i} type={igKey}></BurgerIngredient>;
        })
    })
    .reduce((arr, el) =>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length ===0){
        transformedIngredients = <p>Plesase start to add ingredients</p>
    }

    return(
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default burger;