/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import API from "../utils/API";
import NavbarDash from "../components/NavbarDash";
import Footer from "../components/Footer";
import IconDance from "../components/IconDance";
import Background from "../images/background.png";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

function FullWidthGrid(props) {
  const { classes } = props;
}

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

const pageTitle = {
  fontSize: "40px",
};

const nameTitle = {
  fontSize: "22px",
};

const initialState = {
  title: "",
  titleError: "",
  author: "",
  authorError: "",
  body: "",
  bodyError: "",
};


class Dashboard extends Component {
  state = initialState;

  constructor(props) {
    super(props);
    this.state = {
      dbPoems: [],
      myPoems: [],
      title: "",
      author: "",
      body: "",
      userProfile: [],
      name: "",
      email: "",
    };
  }

  // When the component mounts, load allpoems will load
  componentDidMount() {
    this.loadAllPoems();
    this.loadUserInfo();
  }

  // Get user info and save
  loadUserInfo = () => {
    API.getUserData()
      .then(res => this.setState({
        userProfile: res.data,
        name: res.data.name,
        email: res.data.email,
      }))
      .catch(err => console.log(err));
    console.log(this.state.userProfile);
  };

  // Load Poems from DB
  loadPoemDB = () => {
    API.getPoemsDB()
      .then(res => this.setState({
        dbPoems: res.data,
        title: "",
        author: "",
        body: "",
      }))
      .catch(err => console.log(err));
  };

  // Load Poems from DB by user id/session user
  loadMyPoems = () => {
    API.getMyPoems()
      .then(res => this.setState({
        myPoems: res.data,
        title: "",
        author: "",
        body: "",
      }))
      .catch(err => console.log(err));
  };

  // Load all poems from database and mypoems
  loadAllPoems = () => {
    this.loadPoemDB();
    this.loadMyPoems();
  };

  // Delete poems
  deletePoems = (id) => {
    API.deletePoem(id)
      // eslint-disable-next-line no-unused-vars
      .then(res => this.loadAllPoems())
      .catch(err => console.log(err));
  };

  // Input on change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Submit saves data then loads poems
  handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);

      // clear form
      this.setState(initialState);

      const {
        title,
        author,
        body,
      } = this.state;
      if (title && author && body) {
        API.savePoem({
          title,
          author,
          body,
        })
          .then(res => this.loadAllPoems())
          .catch(err => console.log(err));
      }
    }
  };

  validate = () => {
    let titleError = "";
    let authorError = "";
    let bodyError = "";

    if (!this.state.title) {
      titleError = "Must enter a title";
    }

    if (!this.state.author) {
      authorError = "Must enter an author";
    }

    if (this.state.body.length > 1000) {
      bodyError = "Character limit is 1000";
    }

    if (titleError || bodyError || authorError) {
      this.setState({
        titleError, bodyError, authorError,
      });
      return false;
    }

    return true;
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="dashboard-page" style={crumpledPaper}>
        <NavbarDash />
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <div style={pageTitle}>
                <span>Dashboard</span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <div>
                <h2 value={this.state.email}>
                  <div style={nameTitle}>
                    <span>Hi </span>
                    {this.state.name}
                    <span> ,</span>
                    <span>To start writing fill out the poem form.</span>
                  </div>
                </h2>
                <div className="pwrapper">
                  <div className="poem-wrapper">
                    <h2>Post your poems below</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                      <div className="title">
                        <label htmlFor="title">Poem Title</label>
                        <input
                          value={this.state.title}
                          onChange={this.handleInputChange}
                          type="text"
                          placeholder="Title (required)"
                          name="title"
                        />
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.titleError}
                        </div>
                      </div>
                      <div className="author">
                        <label htmlFor="author">Poem Author</label>
                        <input
                          onChange={this.handleInputChange}
                          value={this.state.author}
                          type="text"
                          placeholder="Author (required)"
                          name="author"
                        />
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.authorError}
                        </div>
                      </div>
                      <div className="poem">
                        <label htmlFor="poem">Poem</label>
                        <textarea
                          value={this.state.body}
                          onChange={this.handleInputChange}
                          rows="8"
                          placeholder="Enter Poem here"
                          name="body"
                        />
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.bodyError}
                        </div>
                      </div>
                      <div className="postPoem">
                        <button
                          onClick={this.handleFormSubmit}
                          type="submit"
                        >
                          <span>Submit Poem</span>
                          <IconDance><span role="img" aria-label="write">✍</span></IconDance>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              {/* Database Poems */}
              <div id="dbPoems">
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
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </React.Fragment>)}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <div id="myPoems">
                <div className="APIS">
                  {!this.state.myPoems.length ? (
                    <h1 className="text-center">No Poems to Display. Start writing!</h1>
                  ) : (
                    <React.Fragment>
                      {this.state.myPoems.map((mypoems, index) => (
                        <div
                          value={mypoems._id}
                          className="mb-5"
                        >
                          <Card>
                            <CardContent>
                              <Typography color="textSecondary" gutterBottom>
                                {index === 0 ? "My Poems" : null }
                              </Typography>
                              <Typography variant="h5" component="h4">{mypoems.title}</Typography>
                              <Typography>by:</Typography>
                              <Typography>{mypoems.author}</Typography>
                              <Typography color="textSecondary">{mypoems.body}</Typography>
                              <button
                                className="btn btn-danger btn-sm mt-2"
                                onClick={() => this.deletePoems(mypoems._id)}
                                type="submit"
                              >
                                <span>Delete</span>
                              </button>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Dashboard);
