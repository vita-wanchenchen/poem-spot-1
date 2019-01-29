/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_: "",
      name: "",
    };
  }

  handleEmailChange = (event) => {
    event.preventDefault();
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordChange = (event) => {
    event.preventDefault();
    this.setState({
      password: event.target.value,
    });
  }

  handleNameChange = (event) => {
    event.preventDefault();
    this.setState({
      name: event.target.value,
    });
  }

  handleConfirmPasswordChange = (event) => {
    event.preventDefault();
    this.setState({
      password_: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { password, password_, email } = this.state;
    if (password === password_) {
      Axios.post("http://localhost:3001/users/register", {
        name: "Name",
        email,
        password,
      })
        .then((res) => {
          const { history } = this.props;
          if (res.status === 201) {
            history.push("/login");
          }
        });
    }
  }

  render() {
    return (
      <div className="main">
        <div className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="container">
          <div className="main-body">
            <div className="authentication">
              <h3>Register</h3>
              <input onChange={this.handleNameChange} type="text" placeholder="Name" name="email" />
              <input onChange={this.handleEmailChange} type="text" placeholder="Email Address" name="email" />
              <input onChange={this.handlePasswordChange} type="password" placeholder="Password" name="password" />
              <input onChange={this.handleConfirmPasswordChange} type="password" placeholder="Confirm Password" name="password_" />
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
