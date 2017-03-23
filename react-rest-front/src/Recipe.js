import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import './index.css';

class Recipe extends Component {
    constructor() {
        super();
        this.state = {
            recipe: {
                title: "",
                image_url: "",
            },
            groceryList: [],
            ingredients: [],
            loggedIn: false,
            loaded: false,
        }
        this.checkHandler = this.checkHandler.bind(this);
        this.saveList = this.saveList.bind(this)
    };
    componentWillMount() {
        axios.get('/verify', { headers: { authorization: localStorage.authToken } })
            .then((res) => {
                // console.log(res.status)
                if (res.status === 200) {
                    this.setState({ loggedIn: true })
                }
                else if (res.status === 403) {
                    this.state = { loggedIn: false }
                }
            })
        axios.get('/recipe/' + localStorage.id)
            .then(response => {
                // console.log(response.data.newRecipe)
                this.setState({
                    recipe: response.data.recipe,
                    ingredients: response.data.newRecipe,
                    loaded: true,
                })
                // console.log(this.state.recipe)
            })
        document.title = "Your Recipe"
    };
    checkHandler(event, i) {
        if (event.target.checked) {
            this.state.ingredients[i].need = true;
            this.setState({
                ingredients: this.state.ingredients
            })
            localStorage.groceryList = JSON.stringify(this.state.ingredients)
        }
        //remove item if clicked again
        else {
            this.state.ingredients[i].need = false;
            let removeItemIndex = this.state.ingredients.indexOf({ i })
            this.state.ingredients.splice(removeItemIndex)
            // console.log('this is the removed item')
            // console.log(removeItemIndex)
            this.setState({
                ingredients: this.state.ingredients
            })
        }
        localStorage.recipeTitle = JSON.stringify(this.state.recipe.title)
        localStorage.groceryList = JSON.stringify(this.state.ingredients)
    };
    saveList() {
        axios
            .post('/groceryList/' + localStorage.username, { ingredients: localStorage.groceryList, title: localStorage.recipeTitle })
            .then((res) => {
                localStorage.groceryList = res.data.groceryList
                localStorage.recipeTitle = res.data.recipeTitle
            })
        location.href = "/UserPage";
    };
    render() {
        let loading;
        if (!this.state.loaded) {
            let loading = (<h1> loading... </h1>);
        }
        else if (this.state.loaded && this.state.loggedIn) {
            let thingsToCook = this.state.ingredients.map((ingredient, i) => {
                return (
                    <div key={i}>
                        <form>
                            <input onChange={(event) => { this.checkHandler(event, i) }} className='checkbox-inline' type='checkbox' />
                            <label id={i} className='recipe-ingred'>{ingredient.ingredients}</label>
                        </form>
                    </div>
                )
            });
            loading =
                <div className='recipebody'>
                    <div className="recipe-header">
                        <Navbar />
                        <a href="/SearchResults"><button className="btn btn-primary" >Back To Search Results</button></a>
                        <h2 className='recipe-result'>{this.state.recipe.title}</h2>
                        <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                            <img className='recipeImage' src={this.state.recipe.image_url} alt="recipephoto" />
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                                <h2 className='whattobuy'>Check What You Need </h2>
                                <h3 className='ingredList'>Ingredients:</h3>
                                {thingsToCook}
                                <button className="btn btn primary" onClick={() => this.saveList()}>Save Your List</button>
                            </div>
                        </div>
                    </div>
                </div>
        }
        else if (this.state.loaded && !this.state.loggedIn) {
            let thingsToCook = this.state.ingredients.map((ingredient, i) => {
                return (
                    <div key={i}>
                        <form>
                            {/*<input onChange={(event) => { this.checkHandler(event, i) }} className='checkbox-inline' type='checkbox' />*/}
                            <label id={i} className='recipe-ingred'>{ingredient.ingredients}</label>
                        </form>
                    </div>
                )
            });
            loading =
                <div className='recipebody'>
                    <div className="recipe-header">
                        <Navbar />
                        <a href="/SearchResults"><button className="btn btn primary">Back To Search Results</button></a>
                        <h2 className='recipe-result'>{this.state.recipe.title}</h2>
                        <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                            <img className='recipeImage' src={this.state.recipe.image_url} alt="recipephoto" />
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                                <h2 className='whattobuy'>Check What You Need </h2>
                                <h3 className='ingredList'>Ingredients:</h3>
                                {thingsToCook}
                                <h1 className='register'>Please Register To Save Your List</h1>
                            </div>
                        </div>
                    </div>
                </div>
        }

        return (
            <div>
                {loading}
            </div>
        )
    }
};
export default Recipe