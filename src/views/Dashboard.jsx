import React, { Component } from "react";
// import Axios from "axios";
import API from "../utils/API";
import NavbarDash from "../components/NavbarDash";
import Footer from "../components/Footer";
import Button from "../components/Button";
import IconDance from "../components/IconDance";
import Background from "../images/background.png";

const crumpledPaper = {
  backgroundImage: `url(${Background})`,
};

const pageTitle = {
  fontSize: "70px",
};


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbPoems: [],
      myPoems: [],
      title: "",
      author: "",
      body: "",
      user: localStorage.getItem("user.id"),
      // eslint-disable-next-line react/no-unused-state
      userProfile: {},
    };
  }

  // When the component mounts, load allpoems will load
  componentDidMount() {
    this.loadPoemDB();
    this.loadMyPoems();
    this.loadUserInfo();
  }

loadUserInfo = () => {
  const userProfile = localStorage.getItem("user");
  // eslint-disable-next-line react/no-unused-state
  this.setState({ userProfile });
  console.log(`UserProfile${userProfile}`);
  return userProfile;
}

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

  // Load Poems from DB by id/ use session req.user?
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

  // input on change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Submit saves data then loads poems
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      author,
      body,
      // user,
    } = this.state;
    if (title && author && body) {
      API.savePoem({
        title,
        author,
        body,
        // user,
      })
        // eslint-disable-next-line no-unused-vars
        .then(res => this.loadPoemDB())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div id="dashboard-page" style={crumpledPaper}>
        <NavbarDash />
        <div className="container" display="flex" flex-direction="row">
          <div style={pageTitle}>
            <span>Dashboard</span>
          </div>
          {/* <div className="container" display="flex" flex-direction="row"> */}
          <div className="row">
            <div className="col-md-6">
              <form className="form-group">
                <div
                  className="card-body align-self-center"
                  value={this.state.user}
                >
                  <h4>Poem Title :</h4>
                  <input
                    className="form-control form-control-lg mb-3"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                    type="text"
                  />
                  <h4>Poem Author :</h4>
                  <input
                    className="form-control form-control-lg mb-3"
                    value={this.state.authors}
                    onChange={this.handleInputChange}
                    name="author"
                    placeholder="Author (required)"
                    type="text"
                  />
                  <h4>Poem :</h4>
                  <textarea
                    className="form-control form-control-lg mb-3"
                    rows="8"
                    value={this.state.body}
                    onChange={this.handleInputChange}
                    name="body"
                    placeholder="Body (required)"
                  />
                  <Button
                    disabled={!(this.state.author && this.state.title && this.state.body)}
                    onClick={this.handleFormSubmit}
                    type="submit"
                  >
                    <span>Submit Poem</span>
                    <IconDance><span role="img" aria-label="write">✍</span></IconDance>
                  </Button>
                </div>
              </form>
            </div>
            {/* Database Poems */}
            <div id="dbPoems" className="col-md-6 s7">
              <div className="APIS">
                <h1>All Poems</h1>
                {!this.state.dbPoems.length ? (
                  <h1 className="text-center">No Poems to Display</h1>
                ) : (
                  <React.Fragment>
                    {this.state.dbPoems.map(poems => (
                      <div>
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
            <div id="myPoems" className="col-md-6 s7">
              <div className="APIS">
                <h1>My Poems</h1>
                {!this.state.myPoems.length ? (
                  <h1 className="text-center">No Poems to Display. Start writting!</h1>
                ) : (
                  <React.Fragment>
                    {this.state.myPoems.map(poems => (
                      <div>
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
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
