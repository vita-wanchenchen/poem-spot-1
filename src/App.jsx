/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
// eslint-disable-next-line import/no-unresolved
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/" exact component={Home} />
    </Switch>
  </div>
);

export default App;
