import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory } from 'react-router';
import Register from './Register';
import Login from './Login';
import SearchResults  from './SearchResults';
import Recipe from './Recipe';
import SearchPage from './SearchPage';
import UserPage from './UserPage';

ReactDOM.render(<Router history={browserHistory}>
  <Route path="/" component={App} />
  <Route path='/Register' component={Register}/>
  <Route path='/Login' component={Login}/>
  <Route path='/SearchResults' component={SearchResults}/>
  <Route path='/Recipe' component={Recipe}/>
  <Route path='/SearchPage' component={SearchPage}/>
  <Route path='/UserPage' component={UserPage}/>
</Router>, document.getElementById('root'));