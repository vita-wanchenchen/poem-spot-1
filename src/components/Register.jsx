/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import Axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Button from "./Button";
import Background from "../images/background.png";

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

const styleMain = {
  height: "900px",
};

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
    const {
      name,
      password,
      password_,
      email,
    } = this.state;
    if (password === password_) {
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

  render() {
    return (
      // <div id="register-page">
      //   <div className="main">
      <div id="register-page" style={crumpledPaper} className=" row">
        <div className="main" style={styleMain}>
          <Navbar />
          {/* <div className="container">
            <div className="main-body">
              <div className="authentication"> */}
          <div className="row justify-content-center align-self-center text-center mr-5 ml-5">
            {/* <div className="card w-50 border-dark mt-3"> */}
            <div className="card-body col-md-3 mt-3 w-50">
              <h3 className="card-title">Register</h3>
              {/* <h3>Register</h3> */}
              <div className="form-group">
                {/* <div className="col-14"> */}
                <input className="form-control form-control-lg" onChange={this.handleNameChange} type="text" placeholder="Name" name="email" />
                {/* </div> */}
              </div>
              <div className="form-group">
                {/* <div className="col-14"> */}
                <input className="form-control form-control-lg" onChange={this.handleEmailChange} type="text" placeholder="Email Address" name="email" />
                {/* </div> */}
              </div>
              <div className="form-group">
                {/* <div className="col-14"> */}
                <input className="form-control form-control-lg" onChange={this.handlePasswordChange} type="password" placeholder="Password" name="password" />
                {/* </div> */}
              </div>
              <div className="form-group">
                <div className="col-14">
                  <input className="form-control form-control-lg" onChange={this.handleConfirmPasswordChange} type="password" placeholder="Confirm Password" name="password_" />
                </div>
              </div>
              <div className="form-group">
                <Button onClick={this.handleSubmit}>
                  <span>Submit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* // </div> */}
        <Footer />
        {/* //   </div> */}
      </div>
      // </div>
    );
  }
}

export default Register;
