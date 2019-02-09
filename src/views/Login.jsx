import React, { Component } from "react";
import Axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../images/background.png";

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

const styleMain = {
  height: "900px",
};

const initialState = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
};
class Login extends Component {
state = initialState;

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
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);

      // clear form
      this.setState(initialState);
    }
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

  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email.includes("@")) {
      emailError = "Requires a valid email";
    }

    if (!this.state.password) {
      passwordError = "Must enter a password";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  render() {
    return (
      <div id="login-page" style={crumpledPaper} className=" row">
        <div className="main" style={styleMain}>
          <Navbar />
          <div className="wrapper">
            <div className="form-wrapper">
              <h1>Login</h1>
              <form onSubmit={this.handleSubmit} noValidate>
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
                <div className="createAccount">
                  <button type="submit">Log in</button>
                  <a href="/register"><small>Need to Create Account?</small></a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

export default Login;
