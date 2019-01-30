/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import Footer from "./Footer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3 style={{ fontSize: "2em" }}>Dashboard</h3>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
