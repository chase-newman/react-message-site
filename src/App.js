import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Bitcoin from './Components/Bitcoin'; 


const API_KEY = "AIzaSyABm1jv-2AjOHuF1VKAknVlih_iJQGxLXs"

class App extends Component {
  state = {
    email: '',
    password: '',
    authenticated: false
  }
  
  emailHandler = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  
  passwordHandler = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  
  loginHandler = () => {
    axios({
      method: "post",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
      data: {
        email: this.state.email,
        password: this.state.password,
        returnSecureToken: true
      },
      contentType: "application/JSON"
    }).then(response => {
        console.log(response);
        this.setState({
          authenticated: true
        });
    }).catch(err => {
        console.log(err)
    });
  }
  
  signupHandler = () => {
    axios({
      method: "post",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
      data: {
        email: this.state.email,
        password: this.state.password,
        returnSecureToken: true
      },
      contentType: "application/JSON"
    }).then(response => {
        console.log(response)
        this.setState({
          authenticated: true
        })
    }).catch(err => {
        console.log(err)
    });
  };
  
  logoutHandler = () => {
    this.setState({
      email: '',
      password: '',
      authenticated: false
    }) 
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
         <span className="navbar-brand mb-0 h1">React Message Site</span>
          {this.state.authenticated ? 
            <li className="nav-item">
            <button onClick={this.logoutHandler} className="btn btn-danger">Logout</button>
          </li> : null }
        </nav>
        <div className="container">
        {this.state.authenticated ? 
          <div>
            <div className="row">
              <div className="col-sm-10">
                <h1>Welcome, {this.state.email}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10">
                <Bitcoin />
                <h3>Post A New Message</h3>
              </div>
            </div>
          </div>
          : <div className="row">
            <div className="col-lg-6 col-md-10 col-sm-12" id="login-col">
              <h1>Login/SignUp</h1>
              <input 
                onChange={this.emailHandler}
                type="text" className="form-control" placeholder="Email..."/>
              <input 
                onChange={this.passwordHandler}
                type="password" className="form-control" placeholder="Password (Must Be At Least 6 Characters)..."/>
              <button 
                onClick={this.loginHandler}
                className="btn btn-info btn-block">Login</button>
              <button 
                onClick={this.signupHandler}
                className="btn btn-secondary btn-block">Sign Up</button>
            </div>
          </div>}
        </div>
      </div>
  );    
  }

}

export default App;
