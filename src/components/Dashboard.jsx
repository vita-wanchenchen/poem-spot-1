/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
// eslint-disable-next-line no-unused-vars
import Axios from "axios";
import API from "../utils/API";
import NavbarDash from "./NavbarDash";
import Footer from "./Footer";
import Button from "./Button";
import IconDance from "./IconDance";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbPoems: [],
      title: "",
      author: "",
      body: "",
    };
  }

  // When the component mounts, load allpoems will load
  // componentDidMount() {
  //   this.loadPoemDB();
  // }

  // Load Poems from DB
  loadPoemDB = () => {
    API.getPoemsDB()
      .then(res => this.setState({
        dbPoems: res.data,
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
    if (this.state.title && this.state.author) {
      API.savePoem({
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
      })
        // eslint-disable-next-line no-unused-vars
        .then(res => this.loadPoemDB())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <NavbarDash />
        <div>
          <h3 style={{ fontSize: "5em" }}>Dashboard</h3>
        </div>
        <div className="conatiner" id="form">
          <form className="form-group main-body">
            <div className="authentication">
              Poem Title :
              <input
                className="form-control"
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
                type="text"
              />
              Poem Author :
              <input
                className="form-control"
                value={this.state.authors}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
                type="text"
              />
              Poem :
              <textarea
                className="form-control"
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
              Submit Poem
                <IconDance><span role="img" aria-label="write">✍</span></IconDance>
              </Button>
            </div>
          </form>
        </div>
        <div id="dbPoems">
          <div className="APIS">
            <h1>My Poems</h1>
            {!this.state.dbPoems.length ? (
              <h1 className="text-center">No Poems to Display</h1>
            ) : (
              <React.Fragment>
                {this.state.dbPoems.map(poems => (
                  <div>
                    <h2>{poems.title}</h2>
                    <p>Authors: {poems.authors}</p>
                    <p>Poem: {poems.body}</p>
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
