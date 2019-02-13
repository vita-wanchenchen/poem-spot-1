import React, { Component } from "react";
import Axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../images/background.png";

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

const initialState = {
  name: "",
  nameError: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  password2: "",
  password2Error: "",
};

class Register extends Component {
state = initialState;

constructor(props) {
  super(props);
  this.state = {
    email: "",
    password: "",
    password2: "",
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
      password2: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);

      // clear form
      this.setState(initialState);

      const {
        name,
        password,
        password2,
        email,
      } = this.state;
      if (password === password2) {
        Axios.post("http://localhost:3001/users/register", {
          name,
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
  }

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let password2Error = "";

    if (!this.state.name) {
      nameError = "Must enter your name";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Requires a valid email";
    }

    if (this.state.password.length < 6) {
      passwordError = "Password must have atleast 6 characters";
    }

    if (!this.state.password === this.state.password2) {
      password2Error = "Passwords do not match";
    }

    if (emailError || passwordError || nameError || password2Error) {
      this.setState({
        emailError, passwordError, nameError, password2Error,
      });
      return false;
    }

    return true;
  };

  render() {
    return (
      <div id="register-page" style={crumpledPaper} className=" row">
        <div className="main">
          <Navbar />
          <div className="wrapper">
            <div className="form-wrapper">
              <h1>Create Account</h1>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="name">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={this.handleNameChange}
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.nameError}
                  </div>
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.handleEmailChange}
                    type="text"
                    placeholder="Email Address"
                    name="email"
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailError}
                  </div>
                </div>
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.handlePasswordChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.passwordError}
                  </div>
                </div>
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.handleConfirmPasswordChange}
                    type="password"
                    placeholder="Password"
                    name="password2"
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.password2Error}
                  </div>
                </div>
                <div className="createAccount">
                  <button type="submit">Create Account</button>
                  <a href="/login"><small>Already Have an Account?</small></a>
                </div>
              </form>
            </div>
          </div>
          <Footer />

        </div>
      </div>
    );
  }
}

export default Register;
