import React, { useState, useEffect, useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MenuRounded from "@material-ui/icons/MenuRounded";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import theme from "../styles/theme";
import { routes } from "../routes";
import { PlayerContext, MinimalizeContext } from "../context";
import { withRouter, RouteComponentProps } from "react-router";

const useStyles = makeStyles({
  button: {
    width: "45px",
    minWidth: 0,
    padding: "8px 0",
  },
  buttonLabel: {
    minWidth: 0,
    width: "45px",
  },
  svgIcon: {
    width: "36px",
    height: "36px",
  },
  menuLink: {
    color: "#222",
    fontSize: "1.2em",
    fontFamily: theme.typography.fontFamily,
    textAlign: "center",
    textDecoration: "none",
    [theme.breakpoints.up("lg")]: {
      marginRight: 0,
    },
    "&:hover": {
      color: "#555",
      textDecoration: "none",
    },
  },
  navButton: {
    display: "block",
    padding: "0 1em",
    textAlign: "center",
    marginLeft: "15px",
    minWidth: 0,
    width: "auto",
    "& a": {
      width: "100%",
      marginLeft: 0,
      marginRight: " 0 !important",
    },
    "& span": {
      textTransform: "none",
    },
  },
  mobileNav: {
    zIndex: 9999999,
    "& li": {
      padding: 0,
      width: "100%",
    },
    "& a": {
      padding: "0.5em 1.5em",
    },
  },
  desktopNav: {
    "& a": {
      marginLeft: "1em",
    },

    "& button a": {
      marginLeft: 0,
    },
  },
});

const Navigation: React.FC<RouteComponentProps> = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    [docWidth, setDocWidth] = useState<number>(document.body.offsetWidth);

  const classes = useStyles();

  const setPlayerOn = useContext<(on?: boolean) => void>(PlayerContext),
    minimalizePlayer = useContext<{
      minimalize: (on?: boolean) => void;
      currently: boolean;
    }>(MinimalizeContext);

  const handleNaviconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    handleNaviconClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(null);
    },
    handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (e.target instanceof HTMLAnchorElement) {
        const href: string = e.target.pathname;
        minimalizePlayer.minimalize(true);
        history.push(href);
        setAnchorEl(null);
      }
    },
    handlePlayerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const bodyEl = document.querySelector("#main-body")!;
      bodyEl?.classList.add("scroll-lock");

      setPlayerOn(true);
      setAnchorEl(null);

      if (minimalizePlayer.currently) {
        minimalizePlayer.minimalize(false);
      }
    };

  const handleResize = () => {
    setDocWidth(document.body.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("reisze", handleResize);
    };
  });

  return (
    <Box ml={"auto"}>
      {docWidth < 1280 && (
        <Box component="nav">
          <Button
            classes={{ root: classes.button, label: classes.buttonLabel }}
            aria-controls="main-menu"
            aria-haspopup="true"
            onClick={handleNaviconClick}
          >
            {!!anchorEl ? (
              <CloseRounded className={classes.svgIcon} />
            ) : (
              <MenuRounded className={classes.svgIcon} />
            )}
          </Button>
          <Menu
            id="main-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            className={classes.mobileNav}
            onClose={handleNaviconClose}
          >
            <ThemeProvider theme={theme}>
              <MenuItem>
                <Link
                  className={classes.menuLink}
                  href={routes.home}
                  onClick={handlePlayerClick}
                >
                  Player
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className={classes.menuLink}
                  href={routes.search}
                  onClick={handleLinkClick}
                >
                  Search
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className={classes.menuLink}
                  href={routes.collection}
                  onClick={handleLinkClick}
                >
                  Collection
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className={classes.menuLink}
                  href={routes.playlists}
                  onClick={handleLinkClick}
                >
                  Playlists
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className={classes.menuLink}
                  href={routes.login}
                  onClick={handleLinkClick}
                >
                  Log in
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className={classes.menuLink}
                  href={routes.register}
                  onClick={handleLinkClick}
                >
                  Register
                </Link>
              </MenuItem>
            </ThemeProvider>
          </Menu>
        </Box>
      )}
      {docWidth >= 1280 && (
        <Box
          component="nav"
          display="flex"
          alignItems="center"
          className={classes.desktopNav}
        >
          <ThemeProvider theme={theme}>
            <Link
              className={classes.menuLink}
              href={routes.home}
              onClick={handlePlayerClick}
            >
              Player
            </Link>
            <Link
              className={classes.menuLink}
              href={routes.search}
              onClick={handleLinkClick}
            >
              Search
            </Link>
            <Link
              className={classes.menuLink}
              href={routes.collection}
              onClick={handleLinkClick}
            >
              Collection
            </Link>
            <Link
              className={classes.menuLink}
              href={routes.playlists}
              onClick={handleLinkClick}
            >
              Playlists
            </Link>
            <Button
              className={classes.navButton}
              variant="contained"
              color="secondary"
            >
              <Link
                className={classes.menuLink}
                href={routes.login}
                onClick={handleLinkClick}
              >
                Login
              </Link>
            </Button>
            <Button className={classes.navButton} variant="contained">
              <Link
                className={classes.menuLink}
                href={routes.register}
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </Button>
          </ThemeProvider>
        </Box>
      )}
    </Box>
  );
};

export default withRouter(Navigation);
