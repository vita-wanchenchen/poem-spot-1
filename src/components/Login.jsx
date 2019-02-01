/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Button from "./Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { password, email } = this.state;
    Axios.post("/users/login", {
      email,
      password,
    })
      .then((res) => {
        const { history } = this.props;
        if (res.status === 200) {
          history.push("/dashboard");
        }
      });
  }

  render() {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="main-body">
            <div className="authentication">
              <h3>Login</h3>
              <input onChange={this.handleEmailChange} type="text" placeholder="Email Address" name="email" />
              <input onChange={this.handlePasswordChange} type="password" placeholder="Password" name="password" />
              <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
