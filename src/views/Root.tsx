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
import { PlayerContext, MinimalizeContext } from "../context";
import { Provider } from "react-redux";
import store from "../store";

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
    padding: "1.5em 1.5em 6em 1.5em",
    "& .MuiTypography-root": {
      padding: "0.5em",
    },
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
    [playerOn, setPlayerOn] = useState<boolean>(false),
    [playerMinimalized, minimalizePlayer] = useState<boolean>(false);

  const handleMinimalizeContext = (on?: boolean) => {
    const element = document.querySelector("#main-body")!;
    if (!on) {
      minimalizePlayer(false);
      element.classList.add("scroll-lock");
      return;
    }
    minimalizePlayer(true);
    element.classList.remove("scroll-lock");
  };

  const handlePlayerContext = (on?: boolean) => {
    if (!on) {
      setPlayerOn(false);
      return;
    }
    setPlayerOn(true);
  };

  return (
    <Provider store={store}>
      <Router>
        <PlayerContext.Provider value={handlePlayerContext}>
          <MinimalizeContext.Provider
            value={{
              minimalize: handleMinimalizeContext,
              currently: playerMinimalized,
            }}
          >
            <Header />
          </MinimalizeContext.Provider>
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
        {playerOn && (
          <Player
            minimalized={playerMinimalized}
            minimalize={minimalizePlayer}
            close={() => setPlayerOn(false)}
          />
        )}
      </Router>
    </Provider>
  );
};

export default Root;
