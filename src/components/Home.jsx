/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line import/no-unresolved
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Footer from "./Footer";

class Home extends Component {
  state = {
    meetUp: [],
    dailyPoem: [],
  };

  componentDidMount() {
    this.loadMeetup();
    this.loadPoem();
  }

  // load meetup API
loadMeetup = () => {
  API.getMeetUp()
    .then(res => this.setState({
      meetUp: res.data[0],
    }))
    .catch(err => console.log(err));
};

// Load Poem API
loadPoem = () => {
  API.getPoems()
    .then(res => this.setState({
      dailyPoem: res.data[0],
    }))
    .catch(err => console.log(err));
};

render() {
  return (
    <div id="home-page">
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
              <h1>Welcome To Poem Spot</h1>
            </div>
          </div>
        </div>
      </div>
      <div id="dailyPoem">
        <div className="APIS">
          <h1>Daily Poem</h1>
          <h2>{this.state.dailyPoem.title}</h2>
          <p>{this.state.dailyPoem.content}</p>
          <p>{this.state.dailyPoem.url}</p>
          {/* <p>{this.state.dailyPoem.poet.name}</p> */}
          {/* <p>{this.state.dailyPoem.poet.url}</p> */}
        </div>
      </div>
      <div id="meetUp">
        <div className="APIS">
          <h1>Meetup Group</h1>
          <h2>{this.state.meetUp.name}</h2>
          {/* <img src={this.state.meetUp.group_photo.thumb_link} alt="" /> */}
          <p>Status: {this.state.meetUp.status}</p>
          <p>Group Link: {this.state.meetUp.link}</p>
          <p>What we are about: </p>
          {this.state.meetUp.description}
          <p>Location:
            <span> {this.state.meetUp.city} </span>,
            <span> {this.state.meetUp.state}</span>
            <span>  {this.state.meetUp.country}</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
}

export default Home;
