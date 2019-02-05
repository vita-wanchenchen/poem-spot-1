import React, { Component } from "react";
// import Axios from "axios";

// eslint-disable-next-line no-unused-vars
import API from "../utils/API";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../images/background.png";
import DailyPoem from "../components/DailyPoem";

const styledWelcome = {
  fontSize: "70px",
  margin: "30px",
};

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

class Home extends Component {
  state = {
    meetUp: [],
    dailyPoem: [],
    dbPoems: [],
  };

  componentDidMount() {
    this.loadMeetup();
    this.loadPoem();
    this.loadPoemDB();
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

  // Load Poems from DB
  loadPoemDB = () => {
    API.getPoemsDB()
      .then(res => this.setState({
        dbPoems: res.data,
      }))
      .catch(err => console.log(err));
  };

  render() {
    return (
    <div>
      <div id="home-page" style={crumpledPaper} className="row">
        <Navbar />
        <div className="main">
          <div className="container">
            <div className="welcome text-center" style={styledWelcome}>
              <span>Welcome To Poem Spot</span>
            </div>
          </div>
        </div>
        <div className="col-md-1" />

        {/* <DailyPoem />
        <div id="dailyPoem" className="col-md-4">
          <div className="APIS">
            <h1>Daily Poem</h1>
            <h2>{this.state.dailyPoem.title}</h2>
            <p>{this.state.dailyPoem.content}</p>
            <p>{this.state.dailyPoem.url}</p>
            {/* <p>{this.state.dailyPoem.poet.name}</p> */}
            {/* <p>{this.state.dailyPoem.poet.url}</p> */}
          {/* </div> */} */}

            <DailyPoem />
          </div>
          </div>

        <div className="col-md-1">

      Database Poems
      <div id="rightSide" className="col-md-5">
            <div id="dbPoems">
              <div className="APIS">
                <h1>Latest Poems</h1>
                {!this.state.dbPoems.length ? (
                  <h1 className="text-center">No Poems to Display</h1>
                ) : (
                  <React.Fragment>
                    {this.state.dbPoems.map(poems => (
                      <div key={poems.title}>
                        <h2>{poems.title}</h2>
                        <p>Author: </p>
                        {poems.author}
                        <p>Poem: </p>
                        {poems.body}
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </div>

          </div>


          <div id="meetUp">
            <div className="APIS">
              <h1>Meetup Group</h1>
              <h2>{this.state.meetUp.name}</h2>
              {/* <img src=
              {this.state.meetUp.group_photo.thumb_link} alt="" /> */}
              <p>Status: </p>
              {this.state.meetUp.status}
              <p>Group Link: </p>
              {this.state.meetUp.link}
              <p>What we are about: </p>
              {this.state.meetUp.description}
              <p>Location: </p>
              <span>{this.state.meetUp.city}</span>
              <span>{this.state.meetUp.state}</span>
              <span>{this.state.meetUp.country}</span>
            </div>
          </div>
        </div>
        <Footer />
    </div>
    );
  }
}

export default Home;
