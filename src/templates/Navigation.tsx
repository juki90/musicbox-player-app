import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MenuRounded from "@material-ui/icons/MenuRounded";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import theme from "../styles/theme";

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
    fontSize: "1.25em",
    fontFamily: theme.typography.fontFamily,
    textAlign: "center",
    marginLeft: "25px",
    marginRight: "25px",
    textDecoration: "none",
    [theme.breakpoints.up("lg")]: {
      marginRight: 0,
    },
    "&:hover": {
      color: "#555",
      textDecoration: "none",
    },
  },
});

const Navigation: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [docWidth, setDocWidth] = useState<number>(document.body.offsetWidth);

  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            onClick={handleClick}
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
            onClose={handleClose}
          >
            <ThemeProvider theme={theme}>
              <MenuItem onClick={handleClose}>
                <Link className={classes.menuLink} href="/player">
                  Player
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.menuLink} href="/collection">
                  Collection
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.menuLink} href="/playlists">
                  Playlists
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.menuLink} href="/search">
                  Search
                </Link>
              </MenuItem>
            </ThemeProvider>
          </Menu>
        </Box>
      )}
      {docWidth >= 1280 && (
        <Box component="nav">
          <ThemeProvider theme={theme}>
            <Link className={classes.menuLink} href="/player">
              Player
            </Link>
            <Link className={classes.menuLink} href="/collection">
              Collection
            </Link>
            <Link className={classes.menuLink} href="/playlists">
              Playlists
            </Link>
            <Link className={classes.menuLink} href="/search">
              Search
            </Link>
          </ThemeProvider>
        </Box>
      )}
    </Box>
  );
};

export default Navigation;
