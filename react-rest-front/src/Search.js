import React, { Component } from 'react';
import './index.css';

class Search extends Component {
    constructor() {
        super();
        // this.state = {
        //     value: ""
        // }
     
        this.getResults = this.getResults.bind(this)
    
}

getResults(event, value) {
    event.preventDefault()
        localStorage.value = value
        location.href = 'http://35.163.170.51/SearchResults'
        
        event.target.value = "";
}
render() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                    <h1 className="search">Lets Find What You Need</h1>
                    <form onSubmit={(event) => { this.getResults(event, this.refs.query.value) }}>
                        <input className='searchBar' type='text' placeholder="What Do You You Have?" ref='query' />
                        <input className='submitbutton' type='submit' value="Bon Appetit!" />
                    </form>
                </div>
            </div>
        </div>

    )
}

}
export default Search