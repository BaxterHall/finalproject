import React, { Component } from 'react';
import './index.css';

class Search extends Component {
    constructor() {
        super();
        this.getResults = this.getResults.bind(this)
    };

    getResults(e, value) {
        e.preventDefault()
        localStorage.value = value;
        location.href = '/#/SearchResults';

    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                        <h1 className="search">What Ingredient Would You Like To Start With?</h1>
                        <form onSubmit={(event) => { this.getResults(event, this.refs.query.value) }}>
                            <input className='searchBar' type='text' placeholder="What Do You Have?" ref='query' />
                            <button className='btn btn-primary' type='submit'>Bon Appetit!</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}
export default Search