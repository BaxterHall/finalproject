import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import SearchResults  from './SearchResults';
import Recipe from './Recipe';
import SearchPage from './SearchPage';
import UserPage from './UserPage';
import './index.css';

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={Home} />
  <Route path='/Register' component={Register}/>
  <Route path='/Login' component={Login}/>
  <Route path='/SearchResults' component={SearchResults}/>
  <Route path='/Recipe' component={Recipe}/>
  <Route path='/SearchPage' component={SearchPage}/>
  <Route path='/UserPage' component={UserPage}/>
</Router>, document.getElementById('app'));