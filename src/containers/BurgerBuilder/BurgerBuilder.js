import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 2.0
};

class BurgerBuilder extends Component{
    state ={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false
    }
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () =>{
        alert('You continue!');
    }
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum>0});
    }
    addIngredientHanlder = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        if(oldCount <=0){
            return;
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                    ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                ingredientAdded={this.addIngredientHanlder}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}
                ></BuildControls>
            </Aux>
        )
    }
}

export default BurgerBuilder;