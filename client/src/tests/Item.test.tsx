import React from "react";
import Item from "../components/Item";
import results from "./utils/ItemListMock";
import { render, screen } from "./utils/test-utils";

const itemList = results;

const initialState = {
  collection: itemList,
  playlists: {
    id: 0,
    name: "First playlist",
    items: itemList,
  },
  inPlayer: undefined,
  loggedAs: "",
  message: {
    error: "",
    message: "",
  },
};

const initialStatePlaying = {
  collection: itemList,
  playlists: {
    id: 0,
    name: "First playlist",
    items: itemList,
  },
  inPlayer: undefined,
  loggedAs: "",
  message: {
    error: "",
    message: "",
  },
};

const itemProps = {
  link: itemList[0].link,
  title: itemList[0].title,
  desc: itemList[0].desc,
  num: itemList[0].id,
  added: itemList[0].added,
  type: "collection",
  inCollection: true,
  inTab: 0,
  playing: false,
};

const itemPropsPlaying = {
  link: itemList[0].link,
  title: itemList[0].title,
  desc: itemList[0].desc,
  num: itemList[0].id,
  added: itemList[0].added,
  type: "collection",
  inCollection: true,
  inTab: 0,
  playing: true,
};

describe("Random items' test", () => {
  it("Renders given title", () => {
    render(<Item {...itemProps} />, { initialState });
    expect(screen.getByTestId("item-title")).toHaveTextContent(itemProps.title);
  });
  it("Doesn't inform about playing if not playing", () => {
    render(<Item {...itemProps} />, { initialState });
    expect(screen.queryByText("(NOW PLAYING)")).toBeNull();
  });
});

describe("Test Item component with 'collection' type, not playing", () => {
  it("Renders with three buttons: play, playlist, remove", () => {
    render(<Item {...itemProps} type="collection" />, {
      initialState,
    });
    expect(screen.getByTestId("collection-play-button")).toHaveTextContent(
      "Play"
    );
    expect(screen.getByTestId("collection-playlist-button")).toHaveTextContent(
      "Playlist"
    );
    expect(screen.getByTestId("collection-remove-button")).toHaveTextContent(
      "Remove"
    );
  });
});

describe("Test Item component with 'search-result' type, not playing", () => {
  it("Renders with three buttons: play, playlist, collection", () => {
    render(<Item {...itemProps} type="search-result" />, {
      initialState,
    });
    expect(screen.getByTestId("search-play-button")).toHaveTextContent("Play");
    expect(screen.getByTestId("search-playlist-button")).toHaveTextContent(
      "Playlist"
    );
    expect(screen.getByTestId("search-collection-button")).toHaveTextContent(
      "In collection"
    );
  });
});

describe("Test Item component with 'playlist' type, not playing", () => {
  it("Renders with two buttons: move, remove", () => {
    render(<Item {...itemProps} inTab={1} type="playlist" />, {
      initialState,
    });
    expect(screen.getByTestId("playlist-move-button")).toBeInTheDocument();
    expect(screen.getByTestId("playlist-remove-button")).toBeInTheDocument();
  });
  it("Doesn't render description as playlist item", () => {
    render(<Item {...itemProps} inTab={1} type="playlist" />, {
      initialState,
    });
    expect(screen.queryByTestId("item-description")).toBeNull();
  });
});

describe("Test Item component with 'playlist' and 'collection' type, WHEN PLAYING", () => {
  it("Renders playlist item with '(NOW PLAYING)' caption in title", () => {
    render(<Item {...itemPropsPlaying} type="playlist" />, {
      initialStatePlaying,
    });
    expect(screen.getByTestId("item-title")).toHaveTextContent("(NOW PLAYING)");
  });
  it("Renders collection item with STOP button", () => {
    render(<Item {...itemPropsPlaying} type="collection" />, {
      initialStatePlaying,
    });
    expect(screen.getByTestId("collection-play-button")).toHaveTextContent(
      "Stop"
    );
  });
});
