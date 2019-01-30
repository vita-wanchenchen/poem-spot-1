import React, { Component } from "react";
// import Axios from "axios";
import API from "../utils/API";

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
  componentDidMount() {
    this.loadPoemDB();
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
    } = this.state;

    if (title && author) {
      API.savePoem({
        title,
        author,
        body,
      })
        // eslint-disable-next-line no-unused-vars
        .then(res => this.loadPoemDB())
        .catch(err => console.log(err));
    }
  };

  render() {
    const {
      dbPoems,
      title,
      authors,
      body,
    } = this.state;
    return (
      <div>
        <div>
          <h3 style={{ fontSize: "5em" }}>Dashboard</h3>
        </div>
        <div className="conatiner" id="form">
          <form className="form-group main-body">
            <div className="authentication">
              <p>Poem Title :</p>
              <input
                className="form-control"
                value={title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
                type="text"
              />
              <p>Poem Author :</p>
              <input
                className="form-control"
                value={authors}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
                type="text"
              />
              <p>Poem :</p>
              <textarea
                className="form-control"
                value={body}
                onChange={this.handleInputChange}
                name="body"
                placeholder="Body (required)"
              />
              <button
                disabled={!(authors && title && body)}
                onClick={this.handleFormSubmit}
                type="submit"
              >
                <span>Submit Poem</span>
              </button>
            </div>
          </form>
        </div>
        <div id="dbPoems">
          <div className="APIS">
            <h1>My Poems</h1>
            {!dbPoems.length ? (
              <h1 className="text-center">No Poems to Display</h1>
            ) : (
              <React.Fragment>
                {dbPoems.map(poems => (
                  <div>
                    <h2>{poems.title}</h2>
                    <p>Authors:</p>
                    <p>{poems.authors}</p>
                    <p>Poem:</p>
                    <p>{poems.body}</p>
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
