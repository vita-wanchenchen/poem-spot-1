// eslint-disable-next-line import/no-unresolved
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <div className="welcome">
              <h1>Welcome To Poet Spot</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
