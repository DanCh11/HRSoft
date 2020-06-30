/*********************************************************************************
 *  WEB422 - Assignment 04
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Haneul Sim Student ID: 116345174 Date: Mar 8, 2019
 *
 ********************************************************************************/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Overview from "./components/Overview.js";
import Projects from "./components/Projects.js";
import Employees from "./components/Employees.js";
import Teams from "./components/Teams.js";
import NotFound from "./components/NotFound.js";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Overview />} />
        <Route exact path="/projects" render={() => <Projects />} />
        <Route exact path="/employees" render={() => <Employees />} />
        <Route exact path="/teams" render={() => <Teams />} />
        <Route render={() => <NotFound />} />
      </Switch>
    );
  }
}

export default App;
