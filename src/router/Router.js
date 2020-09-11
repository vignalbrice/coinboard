import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../screens/Home/Home";
import About from "../screens/About/About";
import Header from "../components/Header/Header";
import axios from "axios";
import { CONST } from "../store/constants/constants";

const RouterNavigation = () => {
  /** Global state */
  const [trending, setTrending] = React.useState([]);
  const [allCoins, setAllCoins] = React.useState([]);
  const [trendingCharts, setTrendingCharts] = React.useState([]);
  const [charts, setCharts] = React.useState([]);
  const [details, setDetails] = React.useState([]);

  React.useEffect(() => {
    axios
      .all([
        axios.get(`${CONST.API_URL}/all_currencies`),
        axios.get(`${CONST.API_URL}/trending`),
      ])
      .then((response) => {
        setTrending(response[0].data);
        setAllCoins(response[0].data);
        setTrendingCharts(response[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home
            trending={trending}
            trendingCharts={trendingCharts}
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
