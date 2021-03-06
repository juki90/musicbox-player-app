import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography, Button, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { removeNotification as removeNotificationAction } from "../actions";

const useStyles = makeStyles({
  message: {
    position: "fixed",
    zIndex: 9999999999,
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "1em 0",
    backgroundColor: (props: MessageProps) => {
      return props.message.error.length ? "#e74c3c" : "#2ecc71";
    },
  },
  messageText: {
    padding: "1em",
    color: "#222",
  },
  messageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
    margin: "0 auto",
    width: "calc(100% - 2em)",
  },
  okButton: {
    marginLeft: "auto",
    padding: 0,
    height: "2.5em",
  },
});

interface MessageProps {
  message: {
    message: string;
    error: string;
  };
  removeNotification: () => void;
}

const Message: React.FC<MessageProps> = (props) => {
  const { message, removeNotification } = props;
  const classes = useStyles(props);

  useEffect(() => {
    document.addEventListener("click", removeNotification);
    return () => {
      document.removeEventListener("click", removeNotification);
    };
  });

  return (
    <Box className={classes.message}>
      <Container className={classes.messageContainer}>
        <Typography variant="body1" className={classes.messageText}>
          {message.error ? message.error : message.message}
        </Typography>
        <Button className={classes.okButton} variant="outlined" color="default">
          OK
        </Button>
      </Container>
    </Box>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  removeNotification: () => dispatch(removeNotificationAction()),
});

export default connect(null, mapDispatchToProps)(Message);
