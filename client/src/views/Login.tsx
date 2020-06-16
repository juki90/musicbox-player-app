import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, TextField, Button, Link } from "@material-ui/core";
import { theme } from "../styles/theme";
import { useCommonStyles } from "./Root";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { routes } from "../routes";
import { loginRequest as loginRequestAction } from "../actions";
import { connect } from "react-redux";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      marginBottom: "1em",
      [theme.breakpoints.up("md")]: {
        width: "400px",
      },
    },
  },
  loginBtn: {
    margin: "1em 2em",
  },
  loginError: {
    color: "#ff2222",
  },
});

interface LoginProps {
  loginRequest: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ loginRequest }) => {
  const commonClasses = useCommonStyles(),
    classes = useStyles(),
    [emailInput, setEmailInput] = useState<string>(""),
    [pswdInput, setPswdInput] = useState<string>(""),
    [emailError, setEmailError] = useState<boolean>(false),
    [pswdError, setPswdError] = useState<boolean>(false),
    [loginError, setLoginError] = useState<boolean>(false),
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const type = e.target.getAttribute("id"),
        val = e.target.value;
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
      setLoginError(false);
      if (val.length === 0) {
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
    handleLoginButton = () => {
      if (loginError) {
        return;
      }
      if (emailError || pswdError) {
        setLoginError(true);
        return;
      }
      if (!emailInput || !pswdInput) {
        setLoginError(true);
        return;
      }
      loginRequest(emailInput, pswdInput);
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
                id="email"
                label="Email"
                error={emailError}
                helperText={emailError && "Wrong email address"}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={emailInput}
              />
              <TextField
                type="password"
                id="password"
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
                onClick={handleLoginButton}
              >
                Login
              </Button>
            </form>
            {loginError && (
              <Typography
                className={classes.loginError}
                variant="body1"
                align="center"
              >
                Please, fill the form up correctly
              </Typography>
            )}
          </Box>

          <Typography align="center">
            If you haven&apos;t registered yet, please
            <Link href={routes.register}> register</Link>.
          </Typography>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  loginRequest: (email: string, password: string) =>
    dispatch(loginRequestAction(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
