import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../templates/Header";
import Home from "./Home";
import Search from "./Search";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    padding: 0,
  },
});

const Root: React.FC = () => {
  const classes = useStyles();
  return (
    <Router>
      <Header />
      <Container className={classes.container}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default Root;
