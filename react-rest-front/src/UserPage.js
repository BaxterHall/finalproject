import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import Recipes from './Mapping';
import './index.css';



class UserPage extends Component {
    constructor() {
        super();
        this.state = {
            groceryList: [],
            loaded: false,
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.passId = this.passId.bind(this)
    };
    componentWillMount() {
        // get all grocery items
        axios
            .get('/groceries/' + localStorage.username)
            .then(response => {
                let groceries = response.data
                if (groceries === undefined) {
                    this.setState({
                        groceryList: [],
                        loaded: false
                    })
                }
                else if (groceries !== undefined) {
                    let newGroceries = groceries.map(grocery => {
                        return ({ ingredient: JSON.parse(grocery.ingredients), title: grocery.title, recipe_id: grocery._id })
                    })
                    this.setState({
                        groceryList: newGroceries,
                        loaded: true,
                    })
                }
            })
        document.title = "Your Cart"
        if (!localStorage.authToken) {
            location.href('/')
        }
    };
    deleteItem(recipeId) {
        axios
            .delete('/groceries/' + localStorage.username + "/" + recipeId)
            .then(response => {
                axios
                    .get('/groceries/' + localStorage.username)
                    .then(response => {
                        let groceries = response.data
                        let newGroceries = groceries.map(grocery => {
                            return ({ ingredient: JSON.parse(grocery.ingredients), title: grocery.title, recipe_id: grocery._id })
                        })
                        this.setState({
                            groceryList: newGroceries,
                            loaded: true,
                        })
                    })
            })
    };
    passId(recipeId) {
        let recipe_id = this.props.recipeId;
    };
    render() {
        let viewCart;
        if (this.state.loaded === false) {
            let viewCart = (<div>
                <div className="userHeader">
                    <Navbar />
                    <h1 className='userTitle'>Hello {localStorage.username}</h1>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                            <h2 className='empty'>Your Cart Is Empty</h2>
                            <h2 className='empty'>Time To Start Shopping</h2>

                        </div>
                    </div>
                </div>
            </div>)
        }
        else if (this.state.loaded === true && this.state.groceryList.length > 0) {
            let mostRecent = this.state.groceryList.length - 1
            let recentNeedIngredients = this.state.groceryList[mostRecent].ingredient.filter(ingredient => {
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
            })
            let recentDontNeedIngredients = this.state.groceryList[mostRecent].ingredient.filter(ingredient => {
                if (!ingredient.need) {
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
            })
            // map previous recipes
            let previousRecipes = this.state.groceryList.map((Recipe, i) => {
                return (
                    <Recipes recipeId={Recipe.recipe_id} key={i} title={Recipe.title} ingredients={Recipe.ingredient} deleteItem={this.deleteItem} />
                )
            })
            return (
                viewCart =
                <div>
                    <div className="userHeader">
                        <Navbar />
                        <h1 className='userTitle'>Hello {localStorage.username}</h1>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                                <a href="/#/SearchResults/"><button className='btn btn-primary'>Back To Search Results</button></a>
                                <h2 className='newrecipeList'>Your Most Recent Recipe</h2>
                                <h3>{this.state.groceryList[mostRecent].title}</h3>
                                <h4 className='needList'>What You Need To Purchase</h4>
                                {recentNeedIngredients}
                                <h4 className='dontNeed'>What You Already Have</h4>
                                {recentDontNeedIngredients}
                                <h2 className="previous">All Recipes</h2>
                                {previousRecipes}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.loaded === true && this.state.groceryList.length === 0) {
            return (
                viewCart =
                <div>
                    <div className="userHeader">
                        <Navbar />
                        <h1 className='userTitle'>Hello {localStorage.username}</h1>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                                <h2 className='empty'>Your Cart Is Empty</h2>
                                <h2 className='empty'>Time To Start Shopping</h2>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className='userBody'>
                {viewCart}
            </div>
        )
    }
};

export default UserPage;