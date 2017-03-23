import React, { Component } from 'react';
import './index.css';
import Navbar from './Navbar'
import Search from './Search'


class App extends Component {
   componentDidMount() {
        document.title = "What Should You Make For Dinner?"
    }
  render() {
    return (
      <div className="App">
        <div className="App-header">
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
export default App;
