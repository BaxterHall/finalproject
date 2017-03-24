import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import AlertContainer from 'react-alert';
import './index.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            warning: null,
            token: localStorage.authToken
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.txtFieldChange = this.txtFieldChange.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.alertOption = {
            offset: 15,
            position: 'top right',
            theme: 'dark',
            time: 1000,
            transition: 'fade'
        };
    };
    componentWillMount() {
        document.title = "Login"
    };
    showAlert() {
        this.msg.error('Login Unsuccessful, Please Try Again'), {
            time: 2000,
            type: 'error',       
        }
    };
    formSubmit(e) {
        e.preventDefault();
        axios
            .post('/login', this.state)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        warning: false
                    })
                    localStorage.authToken = res.data.token;
                    localStorage.username = res.data.username
                    location.href = "/#/UserPage";
                }
            })
            .catch((err) => {
                console.log('in catch')
                this.showAlert()
                this.setState({
                    warning: true
                })              
            })
    };
    txtFieldChange(e) {
        if (e.target.name === 'username') {
            this.setState({
                username: e.target.value
            })
        }
        else if (e.target.name === "password") {
            this.setState({
                password: e.target.value
            })
        }
    };
    render() {
        return (
            <div className='loginHeader'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                            <Navbar />
                            <h3 className="loginForm">Login</h3>
                            <div id='formAuth'>
                                <form onSubmit={this.formSubmit}>
                                    <div className="form-group">
                                        <input
                                            onChange={this.txtFieldChange}
                                            className="form-control"
                                            type="text"
                                            placeholder="Username"
                                            name="username" />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={this.txtFieldChange}
                                            className="form-control"
                                            type="password"
                                            placeholder="Password"
                                            name="password" />
                                    </div>
                                    <div className="form-group">
                                        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                                        <button className="btn btn primary">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Login