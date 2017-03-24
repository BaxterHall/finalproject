import React, { Component } from 'react';
import './index.css'

class Recipes extends Component {

    render() {
        let dontNeedIngredients = this.props.ingredients.filter(ingredient => {
            if (!ingredient.need) {
                return ingredient
            }
            // console.log(ingredient)
        }).map((ingredient, i) => {
            return (
                <div key={i}>
                    <ul key={i}>
                        <li id={i}>{ingredient.ingredients}</li>
                    </ul>
                </div>
            )
        });
        let needIngredients = this.props.ingredients.filter(ingredient => {
            if (ingredient.need) {
                return ingredient
            }
        }).map((ingredient, i) => {
            return (
                <div key={i}>
                    <ul key={i}>
                        <li id={i}>{ingredient.ingredients}</li>
                    </ul>
                </div>
            )
        });
        // console.log(this.props.recipeId)
        return (
            <div className='previousLists'>
                <h3>{this.props.title}</h3>
                <h4>Ingredients You Need</h4>
                {needIngredients}
                <h4>Ingredients You Have</h4>
                {dontNeedIngredients}
                <button className='btn btn-primary' onClick={() => {this.props.deleteItem(this.props.recipeId)}}>Remove Recipe</button>
            </div>
        )
    }
};
export default Recipes;