/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
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

// const styleCard = {
//   width: "400px",
// };


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
      <div id="login-page" style={crumpledPaper} className=" row">
        <div className="main" style={styleMain}>
          <Navbar />
          {/* <div className="container"> */}
          {/* <div className="main-body"> */}
          {/* <form className="authentication"> */}
          <div className="row justify-content-center">
            <div className="card w-50 border-dark mt-3">
              <div className="card-body align-self-center text-center">
                <h3 className="card-title">Login</h3>
                <div className="form-group border-dark">
                  <div className="col-14">
                    <input className="form-control form-control-lg" onChange={this.handleEmailChange} type="text" placeholder="Email Address" name="email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-14">
                    <input className="form-control form-control-lg" onChange={this.handlePasswordChange} type="password" placeholder="Password" name="password" />
                  </div>
                </div>
                <div className="form-group">
                  <Button onClick={this.handleSubmit}>
                    <span>Submit</span>
                  </Button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
          {/* <h3>Login</h3> */}
          {/* </div> */}
          {/* </div> */}
          <Footer />
        </div>
      </div>
    );
  }
}

export default Login;
