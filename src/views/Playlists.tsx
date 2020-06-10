import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { theme } from "../styles/theme";
import Box from "@material-ui/core/Box";
import { useCommonStyles } from "./Root";
import { AppBar, Tabs, Tab, Button, Card, Menu } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import TitleIcon from "@material-ui/icons/Title";
import { connect } from "react-redux";
import PlaylistModal from "../components/PlaylistModal";
import {
  addNewPlaylist as addNewPlaylistAction,
  renamePlaylist as renamePlaylistAction,
  removeFromPlaylist as removeFromPlaylistAction,
  deletePlaylist as deletePlaylistAction,
  sortPlaylist as sortPlaylistAction,
  removeFromCollection as removeFromCollectionAction,
} from "./../actions/index";
import Item from "./../components/Item";
import ItemList from "./../components/ItemList";
import MenuItem from "@material-ui/core/MenuItem";

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
  sortPlaylist: (id: number, way: string) => void;
  removeFromPlaylist: (id: number, link: string) => void;
  removeFromCollection: (link: string) => void;
}

const Playlists: React.FC<PlaylistsProps> = ({
  playlists,
  collection,
  addNewPlaylist,
  renamePlaylist,
  deletePlaylist,
  sortPlaylist,
  removeFromPlaylist,
  removeFromCollection,
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [playlistModal, setPlaylistModal] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange: (
    event: React.ChangeEvent<Record<string, unknown>>,
    n: number
  ) => void = (e, n) => {
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

  const handleSortPlaylist = (id: number, way: string) => {
    sortPlaylist(id, way);
    setAnchorEl(null);
  };

  const playlistTabs = playlists.map((p: Playlist, i: number) => (
    <Tab
      key={`plt-${p.id}`}
      className={classes.selected}
      value={i + 1}
      label={p.name}
    />
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
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      setAnchorEl(e.currentTarget)
                    }
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
            <ItemList
              fromItems={
                activeTab > 0 ? playlists[activeTab - 1].items : collection
              }
              activeTab={activeTab}
              itemsPerPage={10}
              type="playlist"
              rmCollection={removeFromCollection}
              rmPlaylist={removeFromPlaylist}
            />
          </Card>
          <Box></Box>
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
        <Menu
          id="sort-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleSortPlaylist(activeTab - 1, "name")}>
            By name A-Z
          </MenuItem>
          <MenuItem
            onClick={() => handleSortPlaylist(activeTab - 1, "name-reversed")}
          >
            By name reversed Z-A
          </MenuItem>
          <MenuItem onClick={() => handleSortPlaylist(activeTab - 1, "date")}>
            From most recent to oldest
          </MenuItem>
          <MenuItem
            onClick={() => handleSortPlaylist(activeTab - 1, "date-reversed")}
          >
            From oldest to most recent
          </MenuItem>
        </Menu>
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

const mapDispatchToProps = (dispatch: (arg0: Action) => unknown) => ({
  addNewPlaylist: (name: string) => dispatch(addNewPlaylistAction(name)),
  renamePlaylist: (name: string, id: number) =>
    dispatch(renamePlaylistAction(name, id)),
  removeFromPlaylist: (id: number, link: string) =>
    dispatch(removeFromPlaylistAction(id, link)),
  removeFromCollection: (link: string) =>
    dispatch(removeFromCollectionAction(link)),
  deletePlaylist: (id: number) => dispatch(deletePlaylistAction(id)),
  sortPlaylist: (id: number, way: string) =>
    dispatch(sortPlaylistAction(id, way)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
