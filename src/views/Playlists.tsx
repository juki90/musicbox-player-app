import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { theme } from "../styles/theme";
import Box from "@material-ui/core/Box";
import { useCommonStyles } from "./Root";
import { AppBar, Tabs, Tab, Button, Card } from "@material-ui/core";
import SinglePlaylist from "./../components/SinglePlaylist";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import TitleIcon from "@material-ui/icons/Title";
import Item from "../components/Item";
import { connect } from "react-redux";
import PlaylistModal from "../components/PlaylistModal";
import {
  addNewPlaylist as addNewPlaylistAction,
  renamePlaylist as renamePlaylistAction,
  removeFromPlaylist as removeFromPlaylistAction,
  deletePlaylist as deletePlaylistAction,
  sortPlaylist as sortPlaylistAction,
} from "./../actions/index";

const useStyles = makeStyles({
  selected: {
    "&.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  newButton: {
    marginBottom: "1em",
  },
  dangerButton: {
    backgroundColor: "#f66",
    "&:hover": {
      backgroundColor: "#c55",
    },
  },
  actionButton: {
    marginRight: "0.5em",
    marginBottom: "0.5em",
  },
});

interface PlaylistsProps {
  playlists: Playlist[];
  collection: Item[];
  addNewPlaylist: (name: string) => void;
  renamePlaylist: (name: string, id: number) => void;
  deletePlaylist: (id: number) => void;
  sortPlaylist: (id: number) => void;
  removeFromPlaylist: (id: number, link: string) => void;
}

const Playlists: React.FC<PlaylistsProps> = ({
  playlists,
  collection,
  addNewPlaylist,
  renamePlaylist,
  deletePlaylist,
  sortPlaylist,
  removeFromPlaylist,
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [playlistModal, setPlaylistModal] = useState<string>("");

  const handleTabChange = (e: React.ChangeEvent<{}>, n: number) => {
    setActiveTab(n);
  };

  const handlePlaylistModal = (to: string) => {
    setPlaylistModal(to);
  };

  const handleAddPlaylist = (name: string) => {
    setPlaylistModal("");
    addNewPlaylist(name);
  };

  const handleDeletePlaylist = (id: number) => {
    setPlaylistModal("");
    deletePlaylist(id);
    setActiveTab(activeTab - 1);
  };

  const handleEditPlaylist = (name: string, id: number) => {
    setPlaylistModal("");
    renamePlaylist(name, id);
  };

  const playlistsElements = playlists.map((p, i) => {
    const itemList = p.items.map((it) => {
      return (
        <Item
          added={it.added ? it.added : new Date()}
          title={it.title}
          link={it.link}
          desc={it.desc}
          type="playlist"
          onRemove={() => removeFromPlaylist(activeTab - 1, it.link!)}
        />
      );
    });
    return (
      <SinglePlaylist value={activeTab} index={i + 1}>
        {itemList}
      </SinglePlaylist>
    );
  });

  const collectionElements = collection.map((i) => (
    <Item
      added={i.added ? i.added : new Date()}
      title={i.title}
      link={i.link}
      desc={i.desc}
      type="playlist"
    />
  ));

  const playlistTabs = playlists.map((p, i) => (
    <Tab className={classes.selected} value={i + 1} label={p.name} />
  ));
  return (
    <Box p="1.5em 0">
      <ThemeProvider theme={theme}>
        <Paper className={commonClasses.cardOuter} elevation={0}>
          <Typography
            className={commonClasses.introHeading}
            variant="h4"
            component="h1"
          >
            Your playlists
          </Typography>
          <Button
            className={classes.newButton}
            variant="contained"
            color="primary"
            startIcon={<PlaylistAddIcon />}
            onClick={() => handlePlaylistModal("add")}
          >
            Add new
          </Button>
          <AppBar position="static">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="playlist tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab className={classes.selected} value={0} label="Collection" />
              {playlistTabs}
            </Tabs>
          </AppBar>
          <AppBar position="static" color="default">
            <Box p="0.5em">
              <Button
                variant="contained"
                className={classes.actionButton}
                color="primary"
                startIcon={<PlayArrowIcon />}
                size="small"
              >
                Play
              </Button>
              {activeTab > 0 && (
                <>
                  <Button
                    variant="contained"
                    className={classes.actionButton}
                    color="default"
                    startIcon={<SortByAlphaIcon />}
                    size="small"
                    onClick={() => sortPlaylist(activeTab - 1)}
                  >
                    Sort
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.actionButton}
                    color="default"
                    startIcon={<TitleIcon />}
                    size="small"
                    onClick={() => handlePlaylistModal("edit")}
                  >
                    Rename
                  </Button>
                </>
              )}
              {activeTab > 0 && (
                <Button
                  variant="contained"
                  className={`${classes.dangerButton} ${classes.actionButton}`}
                  color="default"
                  startIcon={<DeleteForeverIcon />}
                  size="small"
                  onClick={() => handlePlaylistModal("delete")}
                >
                  Delete
                </Button>
              )}
            </Box>
          </AppBar>
          <Card>
            <SinglePlaylist value={activeTab} index={0}>
              {collectionElements}
            </SinglePlaylist>
            {playlistsElements}
          </Card>
        </Paper>
        {playlistModal && (
          <PlaylistModal
            type={playlistModal}
            playlist={activeTab - 1}
            currentName={
              playlists.filter((pl) => pl.id === activeTab - 1)[0].name
            }
            onEdit={handleEditPlaylist}
            onSave={handleAddPlaylist}
            onDelete={handleDeletePlaylist}
            onCancel={() => handlePlaylistModal("")}
          />
        )}
      </ThemeProvider>
    </Box>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { playlists, collection } = state;
  return {
    playlists,
    collection,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: any }) => any
) => ({
  addNewPlaylist: (name: string) => dispatch(addNewPlaylistAction(name)),
  renamePlaylist: (name: string, id: number) =>
    dispatch(renamePlaylistAction(name, id)),
  removeFromPlaylist: (id: number, link: string) =>
    dispatch(removeFromPlaylistAction(id, link)),
  deletePlaylist: (id: number) => dispatch(deletePlaylistAction(id)),
  sortPlaylist: (id: number) => dispatch(sortPlaylistAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
