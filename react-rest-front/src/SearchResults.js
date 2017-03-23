import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar'

import './index.css';

class SearchResults extends Component {
    constructor() {
        super();
        this.state = {
            searchedRecipes: []
        }
        this.searchAgain = this.searchAgain.bind(this)
        this.getRecipe = this.getRecipe.bind(this)
    };
    componentWillMount() {
        axios.get('http://localhost:3005/search/' + localStorage.value)
            .then(response => {
            // console.log(localStorage)
                this.setState({
                    searchedRecipes: response.data.recipes
                })
            })
    };
     componentDidMount() {
        document.title = "Search Results"
    }
    searchAgain(event, value) {
        event.preventDefault()
        localStorage.value = value
        location.href = './SearchResults'
        event.target.value = "";
    };
    getRecipe(recipes_id) {
        localStorage.id = recipes_id
        location.href = './Recipe'
    };
    render() {
        let searchResults = this.state.searchedRecipes.map((recipes) => {
            return (
                <div key={recipes.recipe_id} className='col-md-4 col-sm-6 col-xs-6' onClick={() => this.getRecipe(recipes.recipe_id)}>
                    <h6 className='searchTitle'>{recipes.title}</h6>
                    <img className='searchImage' src={recipes.image_url} alt="recipephoto" />
                </div>
            )
        });
        return (
            <div className='searchbody'>
                <div className="results-header">
                    <Navbar />
                    <h2 className='searchresults'>Recipes Containing {localStorage.value}</h2>
                </div>
                <div className='container'>
                    <div className='row'>
                        <h3 className='searchtext'>Find Anything You Like?</h3>
                        <form id='searchBar' onSubmit={(event) => { this.searchAgain(event, this.refs.query.value) }}>
                            <input type='text' placeholder="Search Again" ref='query' />
                            <input className='submitbutton' type='submit' value="Bon Appetit!" />
                        </form>
                    </div>
                    {searchResults}
                </div>
            </div>
        )
    }
};

export default SearchResults;