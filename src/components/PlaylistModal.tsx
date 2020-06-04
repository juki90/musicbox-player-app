import React, { useState } from "react";
import {
  Card,
  Modal,
  TextField,
  Button,
  makeStyles,
  Box,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  danger: {
    color: "#c44",
  },
  modalBox: {
    position: "fixed",
    maxWidth: "500px",
    margin: "0 0.5em",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modalHeader: {
    padding: "1em",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  nameInput: {
    "& input": {
      height: "0.5em",
    },
    "& label": {
      transform: "translate(14px, 15px) scale(1)",
    },
  },
});

interface PlaylistModalProps {
  type: string;
  playlist: number;
  currentName: string;
  onSave: (name: string) => void;
  onEdit: (name: string, id: number) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({
  type,
  playlist,
  currentName,
  onSave,
  onEdit,
  onDelete,
  onCancel,
}) => {
  const classes = useStyles();
  const [playlistName, changePlaylistName] = useState<string>(
    type === "edit" ? currentName : ""
  );
  const [nameError, setNameError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePlaylistName(e.target.value);
    setNameError("");
  };

  const handleClose = () => {
    changePlaylistName("");
    onCancel();
  };

  const handleSave = (name: string) => {
    if (!playlistName.length && type !== "delete") {
      setNameError("Playlist's name cannot be empty!");
      return;
    }
    if (type === "edit") {
      onEdit!(name, playlist);
      return;
    }

    if (type === "delete") {
      onDelete!(playlist);
      return;
    }

    onSave!(name);
  };

  const title = (() => {
    switch (type) {
      case "add":
        return "Add new playlist";
      case "edit":
        return "Edit existing playlist";
      case "delete":
        return "Are you sure?";
    }
  })();

  const desc = (() => {
    switch (type) {
      case "add":
        return "Enter a name for the new playlist you are about to create";
      case "edit":
        return "Edit playlist's name";
      case "delete":
        return `You are about to delete playlist named as "${currentName}", proceed?`;
    }
  })();

  return (
    <Modal open={true}>
      <Box className={classes.modalBox}>
        <Card>
          <Box p="1em" className={classes.modalHeader}>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box p="1em">
            <Typography>{desc}</Typography>
          </Box>
          {type !== "delete" && (
            <Box p="0.5em 1em">
              <TextField
                className={classes.nameInput}
                id="playlist-name"
                variant="outlined"
                label="Playlist's name"
                onChange={handleInputChange}
                value={playlistName}
              />
              {nameError && (
                <Box p="0.25em">
                  <Typography variant="body2" className={classes.danger}>
                    {nameError}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
          <Box p="1em">
            <Button color="default" onClick={() => handleSave(playlistName)}>
              {type === "delete" ? "Delete" : "Save"}
            </Button>
            <Button className={classes.danger} onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
};

export default PlaylistModal;
