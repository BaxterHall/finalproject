import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios'
import './index.css';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        }
        this.logOut = this.logOut.bind(this)
    };
    componentWillMount() {
        if (localStorage.authToken) {
            axios.get('/verify', { headers: { authorization: localStorage.authToken } })
                .then((res) => {
                    this.setState({ loggedIn: true })
                });
        }
        else if (!localStorage.authToken) {
            this.state = { loggedIn: false }
        }
    };
    logOut() {
        this.setState({ loggedIn: false })
        localStorage.clear()
        location.href = "/";
    };
    render() {
        let moreThings;
        if (this.state.loggedIn === true) {
            moreThings =
                <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
                    <ul className="nav navbar-nav">
                        <li className="listText">Hello There {localStorage.username}</li>
                        <li><Link to='/SearchPage'>Search For A Recipe</Link></li>
                        <li><Link to='/UserPage'>Your Cart</Link></li>
                        <li className="listText" onClick={this.logOut}>Log Out </li>
                    </ul>
                </nav>
        }
        else if (this.state.loggedIn !== true) {
            moreThings =
                <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Register">Register</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </ul>
                </nav>
        }
        return (
            <div>
                {moreThings}
            </div>
        )
    }
};
export default Navbar