/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import Footer from "./Footer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: "",
      value: "",

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value,
    });
  }


  render() {
    return (
      <div>
        <h3 style={{ fontSize: "2em" }}>Dashboard</h3>
        <h2 style={{ fontSize: "1em" }}>Welcome</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <app>Poem:</app>
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
