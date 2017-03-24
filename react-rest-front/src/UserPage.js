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
    componentDidMount() {
        document.title = "Your Cart"
        // get all grocery items
        axios
            .get('/groceries/' + localStorage.username)
            .then(response => {
                // console.log(response.data)
                let groceries = response.data
                // console.log(groceries)
                let newGroceries = groceries.map(grocery => {
                    return ({ ingredient: JSON.parse(grocery.ingredients), title: grocery.title, recipe_id: grocery._id })
                })
                // console.log(newGroceries)
                this.setState({
                    groceryList: newGroceries,
                    loaded: true,
                })
            })
    };
    deleteItem(recipeId) {
        // console.log(recipeId)
        axios
            .delete('/groceries/' + localStorage.username + "/" + recipeId)
            .then(response => {
                location.reload();
                // // console.log(response)
                // let groc = response.data
                // let newGroceries = groc.map(grocery => {
                //     return ({ ingredient: JSON.parse(grocery.ingredients), title: grocery.title, recipe_id: grocery._id })
                // })
                // // console.log(newGroceries)
                // this.setState({
                //     groceryList: newGroceries,
                //     loaded: true,
                // })
            })
    };
    passId(recipeId) {
        let recipe_id = this.props.recipeId;
    };
    render() {
        let loading;
        if (this.state.loaded === false) {
            let loading = (<h1> loading... </h1>);
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
            // console.log(previousRecipes)
            return (
                loading =
                <div>
                    <div className="userHeader">
                        <Navbar />
                        <h1 className='userTitle'>Hello {localStorage.username}</h1>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                                <a href="/#/SearchResults/"><button className='btn btn primary'>Back To Search Results</button></a>
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
        else {
            return (
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

                {loading}

            </div>
        )
    }
};

export default UserPage;