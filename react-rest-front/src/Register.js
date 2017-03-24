import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import Navbar from './Navbar';
import AlertContainer from 'react-alert';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            warning: null
            // email: null,
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
        document.title = "Register"
    }

    formSubmit(e) {
        e.preventDefault();
        axios
            .post('/encrypt', this.state)
            .then((res) => {
                this.setState({ warning: false })
                location.href = "/#/Login"
            }) // console.log(res);
            .catch((err) => {
                console.log('in catch')
                this.showAlert()
                this.setState({
                    warning: true
                })
            })
    };
    showAlert() {
        this.msg.error('Registration Unsuccessful, Username unavailable'), {
            time: 500,
            type: 'error',
        }
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
            <div className='register'>

                <div className='container'>

                    <div className='row'>
                        <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3'>
                            <Navbar />
                            <h3 className="registration">Register</h3>
                            <div id="regAuth">

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
                                        <button className="btn btn primary">Register</button>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register