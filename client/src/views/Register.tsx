import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, TextField, Button } from "@material-ui/core";
import { theme } from "../styles/theme";
import { useCommonStyles } from "./Root";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { registerRequest as registerRequestAction } from "../actions";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: "1em",
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
  loginBtn: {
    margin: "1em 2em",
  },
  submitError: {
    color: "#ff2222",
  },
});

interface RegisterProps extends RouteComponentProps {
  registerRequest: (
    name: string,
    email: string,
    password: string,
    data: {
      playlists: Playlist[];
      collection: Item[];
    }
  ) => void;
  collection: Item[];
  playlists: Playlist[];
}

const Register: React.FC<RegisterProps> = ({
  registerRequest,
  collection,
  playlists,
  history,
}) => {
  const commonClasses = useCommonStyles(),
    classes = useStyles(),
    [nameInput, setNameInput] = useState<string>(""),
    [emailInput, setEmailInput] = useState<string>(""),
    [pswdInput, setPswdInput] = useState<string>(""),
    [nameError, setNameError] = useState<boolean>(false),
    [emailError, setEmailError] = useState<boolean>(false),
    [pswdError, setPswdError] = useState<boolean>(false),
    [submitError, setSubmitError] = useState<boolean>(false),
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const type = e.target.getAttribute("id"),
        val = e.target.value;
      setSubmitError(false);
      if (type === "name") {
        setNameInput(val);
        setNameError(false);
        return;
      }
      if (type === "email") {
        setEmailInput(val);
        setEmailError(false);
        return;
      }
      if (type === "password") {
        setPswdInput(val);
        setPswdError(false);
        return;
      }
    },
    handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const type = e.target.getAttribute("id"),
        val = e.target.value;
      if (val.length === 0) {
        return;
      }
      if (type === "name" && !/[\w]{3,}/.test(val)) {
        setNameError(true);
        return;
      }
      if (type === "email" && !/(.+)@(.+){2,}\.(.+){2,}/.test(val)) {
        setEmailError(true);
        return;
      }
      if (type === "password" && !/.{8,}/.test(val)) {
        setPswdError(true);
        return;
      }
    },
    handleSubmitButton = () => {
      if (submitError) {
        return;
      }
      if (nameError || emailError || pswdError) {
        setSubmitError(true);
        return;
      }
      if (!nameInput.length || !emailInput.length || !pswdInput.length) {
        setSubmitError(true);
        return;
      }
      registerRequest(nameInput, emailInput, pswdInput, {
        collection,
        playlists,
      });
      setNameInput("");
      setEmailInput("");
      setPswdInput("");
      history.push("/");
    };

  return (
    <Box p="1.5em 0">
      <ThemeProvider theme={theme}>
        <Paper className={commonClasses.cardOuter} elevation={0}>
          <Typography
            className={commonClasses.introHeading}
            variant="h4"
            component="h1"
          >
            Log in to the player
          </Typography>
          <Box
            m="1em 0"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                id="name"
                className={classes.field}
                label="Name"
                error={nameError}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                helperText={nameError && "At least 3 letters"}
                value={nameInput}
              />
              <TextField
                id="email"
                className={classes.field}
                label="Email"
                error={emailError}
                helperText={emailError && "Wrong email address"}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={emailInput}
              />
              <TextField
                id="password"
                className={classes.field}
                type="password"
                label="Password"
                error={pswdError}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                helperText={pswdError && "At least 8 characters"}
                value={pswdInput}
              />
              <Button
                className={classes.loginBtn}
                variant="contained"
                color="primary"
                startIcon={<VpnKeyIcon />}
                onClick={handleSubmitButton}
              >
                Register
              </Button>
            </form>
            {submitError && (
              <Typography className={classes.submitError} variant="body1">
                Please, fill the form up correctly
              </Typography>
            )}
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { collection, playlists } = state;
  return {
    collection,
    playlists,
  };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  registerRequest: (
    name: string,
    email: string,
    password: string,
    data: {
      playlists: Playlist[];
      collection: Item[];
    }
  ) => dispatch(registerRequestAction(name, email, password, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
