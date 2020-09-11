import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../screens/Home/Home";
import About from "../screens/About/About";
import Header from "../components/Header/Header";

const RouterNavigation = () => {
  /** Global state */
  const [trending, setTrending] = React.useState([]);
  const [allCoins, setAllCoins] = React.useState([]);
  const [charts, setCharts] = React.useState([]);
  const [details, setDetails] = React.useState([]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home
            setTrending={setTrending}
            trending={trending}
            setAllCoins={setAllCoins}
            allCoins={allCoins}
            setCharts={setCharts}
            charts={charts}
            setDetails={setDetails}
            details={details}
          />
        </Route>
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};

export default RouterNavigation;
