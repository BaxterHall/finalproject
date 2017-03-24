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
        <div id="homeHeader" className="homeHeader">
          <Navbar />
          <h2 className="homeTitle">What Do You Need To Make Dinner?</h2>
        </div>
        <div>
        <Search />
        </div>
      </div>
    );
  }
};
export default Home;
