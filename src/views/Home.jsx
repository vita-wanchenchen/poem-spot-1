import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import shadows from "@material-ui/core/styles/shadows";
import "../App.css";
import API from "../utils/API";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../images/background.png";

// const { classes, label, backgroundColor } = props;

const styledWelcome = {
  fontSize: "70px",
  margin: "30px",
  textAlign: "center",
};

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

// classes, accessed via classes.
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   padding: theme.spacing.unit * 2,
  //   textAlign: "center",
  //   color: "black",
  //   backgroundColor: "#e7e0ff",
  //   borderRadius: "15px",
  // },
  purple: {
    backgroundColor: "#e7e0ff",
    borderStyle: "none",
    borderRadius: "15px",
    textAlign: "center",
  },
  title: {
    justify: "center",
    borderRadius: "15px",
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "none",
    shadows: "0px",
    boxShadows: "0px",
  },
  poemOfTheDay: {
    textAlign: "left",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: "15px",
  },
  userPoems: {
    textAlign: "left",
    marginRight: "5%",
    marginLeft: "5%",
    borderRadius: "15px",
  },
  meetUp: {
    marginRight: "5%",
    marginLeft: "5%",
    borderRadius: "15px",
  },
});

function FullWidthGrid(props) {
  const { classes } = props;
}

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

  // Increment likes by 1
  incrementLikes = (id) => {
    API.likeCount(id)
    // eslint-disable-next-line no-unused-vars
      .then(res => this.loadPoemDB())
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="home-page" style={crumpledPaper}>
        <Navbar />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <div style={styledWelcome}>Welcome To Poem Spot</div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.poemOfTheDay} id="dailyPoem">
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>Poem of the Day</Typography>
                  <a href="https://www.poemist.com/"><img src="https://www.poemist.com/images/logo.png" id="meetup" alt="" width="150px" /></a>
                  <Typography variant="h5" component="h2">{this.state.dailyPoem.title}</Typography>
                  <Typography color="textSecondary">{this.state.dailyPoem.content}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={this.state.dailyPoem.url}>Source</Button>
                </CardActions>
              </Card>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            {/* Database Poems */}
            <Paper id="dbPoems" className={classes.userPoems}>
              <div className="APIS">
                {!this.state.dbPoems.length ? (
                  <h1 className="text-center">No Poems to Display</h1>
                ) : (
                  <React.Fragment>
                    {this.state.dbPoems.map((poems, index) => (
                      <div>
                        <Card>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              {index === 0 ? "All Poems" : null }
                            </Typography>
                            <Typography variant="h5" component="h4">{poems.title}</Typography>
                            <Typography>by:</Typography>
                            <Typography>{poems.author}</Typography>
                            {/* <Typography color="textSecondary" gutterBottom></Typography> */}
                            <Typography color="textSecondary">{poems.body}</Typography>
                            <button
                              color="#1b1ee5"
                              className="badge badge-secondary"
                              value={poems.likes}
                              onClick={() => this.incrementLikes(poems._id)}
                              type="button"
                            >
                              <span>
                                <i className="material-icons">favorite</i>
                                {poems.likes}
                              </span>
                            </button>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.meetUp}>
              <div id="meetUp">
                <div className="APIS">
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>Atlanta Area Meetup</Typography>
                      <a href="https://www.meetup.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Meetup_Logo.png" id="meetup" alt="" width="150px" /></a>
                      <Typography variant="h5" component="h2">{this.state.meetUp.name}</Typography>
                      <Typography color="textSecondary">
                        <div
                          className="APIS mb-5"
                          dangerouslySetInnerHTML={{ __html: this.state.meetUp.description }}
                        />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" href={this.state.meetUp.link}>Visit Meetup.com</Button>
                    </CardActions>
                  </Card>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}


export default withStyles(styles)(Home);
