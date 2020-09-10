import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../screens/Home/Home";
import About from "../screens/About/About";
import Header from "../components/Header/Header";

const RouterNavigation = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};

export default RouterNavigation;
