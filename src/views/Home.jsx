import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Axios from "axios";

// eslint-disable-next-line no-unused-vars
import API from "../utils/API";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../images/background.png";
// import { purple } from "@material-ui/core/colors";

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
    this.loadDailyPoem();
    this.loadPoemDB();
  }

  // load meetup API chooses random meet up from list
  loadMeetup = () => {
    API.getMeetUp()
      .then(res => this.setState({
        meetUp: res.data[Math.floor(Math.random() * 11)],
      }))
      .catch(err => console.log(err));
  };

  // Load DailyPoem API
  loadDailyPoem = () => {
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
        <div id="dailyPoem" className="col-md-4">
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Poem of the Day</Typography>
              <Typography variant="h5" component="h2">{this.state.dailyPoem.title}</Typography>
              <Typography color="textSecondary">{this.state.dailyPoem.content}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={this.state.dailyPoem.url}>Source</Button>
            </CardActions>
          </Card>
        </div>
        <div className="col-md-1" />
        {/* Database Poems */}
        <div id="rightSide" className="col-md-5">
          <div id="dbPoems">
            <div className="APIS">
              {!this.state.dbPoems.length ? (
                <h1 className="text-center">No Poems to Display</h1>
              ) : (
                <Card>
                  <React.Fragment>
                    <Typography color="textSecondary" gutterBottom>User Poems</Typography>
                    <Typography>
                      {this.state.dbPoems.map(poems => (
                        <div>
                          <h2>{poems.title}</h2>
                          <Typography color="textSecondary" gutterBottom>Author:</Typography>
                          <Typography color="textSecondary" gutterBottom>{poems.author}</Typography>
                          {/* <Typography color="textSecondary" gutterBottom></Typography> */}
                          <Typography color="textSecondary">{poems.body}</Typography>
                        </div>
                      ))}
                    </Typography>
                  </React.Fragment>
                </Card>
              )}
            </div>
          </div>
          <div id="meetUp">
            <div className="APIS mb-5">
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>Random Area Meetup</Typography>
                  <Typography variant="h5" component="h2">{this.state.meetUp.name}</Typography>
                  <Typography color="textSecondary">{this.state.meetUp.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={this.state.meetUp.link}>Visit Meetup.com</Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
