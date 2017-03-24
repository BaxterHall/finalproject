import React, { Component } from 'react';
import './index.css';
import Navbar from './Navbar'
import Search from './Search'


class Home extends Component {
   componentDidMount() {
        document.title = "What Should You Make For Dinner?"
    }
  render() {
    return (
      <div className="home">
        <div className="homeHeader">
          <Navbar />
          <h1 className="homeBigTitle">Whats Cookin?</h1>
          <h2 className="homeTitle">What Do You Need To Make Dinner?</h2>
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
export default Home;
