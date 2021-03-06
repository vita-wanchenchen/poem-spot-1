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

const styledWelcome = {
  fontSize: "70px",
  margin: "30px",
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: "black",
    backgroundColor: "#e7e0ff",
    borderRadius: "15px",
  },
  purple: {
    backgroundColor: "#e7e0ff",
    borderRadius: "15px",
    marginLeft: "5%",
    marginRight: "5%",
    padding: "20px",
    paddingLeft: "20px",
    paddingTop: "20px",
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
  myPoems: {
    backgroundColor: "#e7e0ff",
    borderRadius: "15px",
    marginLeft: "5%",
    marginRight: "5%",
    padding: "10%",
    paddingLeft: "10%",
  },
  allPoems: {
    marginRight: "5%",
    marginLeft: "5%",
    borderRadius: "15px",
    palette: {
      primary: "#e7e0ff",
    },
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
  fontAlign: "center",
  textAlign: "center",
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
        <div id="name">
          <h2 value={this.state.email}>
            <div style={nameTitle}>
              <span>Welcome to your dashboard, </span>
              {this.state.name}
              <span>. To start writing, fill out the form.</span>
            </div>
          </h2>
        </div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div style={pageTitle}>
              <span style={styledWelcome}>Dashboard</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.purple}>
              <div>
                <div>
                  <div>
                    <h2>Post your poems below</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                      <div className="author">
                        <label htmlFor="title">Poem Title</label>
                        <input
                          value={this.state.title}
                          onChange={this.handleInputChange}
                          type="text"
                          placeholder="Title"
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
                          placeholder="Author"
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
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.allPoems}>
              {/* Database Poems */}
              <div id="dbPoems">
                <div className="APIS">
                  {!this.state.dbPoems.length ? (
                    <h1 className="text-center">No poems to display.</h1>
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
          <Grid item sm={12} md={6}>
            <Paper className={classes.myPoems}>
              <div id="myPoems">
                <div className="APIS">
                  {!this.state.myPoems.length ? (
                    <Typography>
                      <h1 className="text-center">No poems to display. Start writing!</h1>
                    </Typography>
                  ) : (
                    <React.Fragment>
                      {this.state.myPoems.map((mypoems, index) => (
                        <div
                          value={mypoems._id}
                          className="mb-5"
                        >
                          <Card cardStyle={{ borderWidth: 0, borderColor: "transparent", elevation: 0 }}>
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
