import React, { Component } from 'react'
import Navbar from './Navbar';
import Search from './Search';
import './index.css';


class SearchPage extends Component {
   componentDidMount() {
        document.title = "Search Page"
    }
    render() {
        return (
      <div className="App">
        <div className="searchHeader">
          <Navbar />
          <h2 className="dinnertitle">What Should You Make For Dinner?</h2>
        </div>
        <Search />
        <div className='container'>
          <div className='row'>

          </div>
        </div>
      </div>
    );
  }
};
export default SearchPage