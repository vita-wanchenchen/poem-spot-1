import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import "./App.css";

const App = () => (
  <div className="App dash">
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/poems" exact component={Home} />
      <Route path="/poems/:id" exact component={Dashboard} />
      <Route path="/users" exact component={Dashboard} />
    </Switch>
  </div>
);

export default App;
