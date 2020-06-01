import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../templates/Header";
import Home from "./Home";
import Search from "./Search";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { routes } from "../routes";
import Collection from "./Collection";
import { headingGradient } from "../styles/theme";
import Playlists from "./Playlists";
import Login from "./Login";
import Register from "./Register";
import Player from "./../templates/Player";
import PlayerContext from "../context";

const useStyles = makeStyles({
  container: {
    padding: 0,
  },
});

export const useCommonStyles = makeStyles({
  introHeading: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "0.5em",
    marginBottom: "1em",
    borderRadius: "5px",
    padding: "1em",
    backgroundImage: headingGradient,
  },
  subtitle: {
    marginBottom: "1em",
  },
  paragraph: {
    marginBottom: "1em",
  },
  contentHeading: {
    margin: "1em 0",
  },
  cardOuter: {
    padding: "1.5em",
  },
  viewButton: {
    margin: "0.5em 0.5em 1em 0",
    padding: "8px 0",
    minWidth: 0,
    width: "42px",
    "& span": {
      margin: 0,
      padding: 0,
    },
    "& .MuiButton-label": {
      width: "12px",
    },
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
  paginationContainer: {
    margin: "1em 0",
    textAlign: "center",
  },
  pagination: {
    display: "inline-block",
  },
});

const Root: React.FC = () => {
  const classes = useStyles(),
    [playerOn, setPlayerOn] = useState<boolean>(false);

  const handlePlayerContext = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPlayerOn(true);
  };

  return (
    <Router>
      <PlayerContext.Provider value={handlePlayerContext}>
        <Header />
      </PlayerContext.Provider>
      <Container className={classes.container}>
        <Switch>
          <Route exact path={routes.home}>
            <Home />
          </Route>
          <Route exact path={routes.search}>
            <Search />
          </Route>
          <Route exact path={routes.collection}>
            <Collection />
          </Route>
          <Route exact path={routes.playlists}>
            <Playlists />
          </Route>
          <Route exact path={routes.login}>
            <Login />
          </Route>
          <Route exact path={routes.register}>
            <Register />
          </Route>
        </Switch>
      </Container>
      {playerOn && <Player />}
    </Router>
  );
};

export default Root;
