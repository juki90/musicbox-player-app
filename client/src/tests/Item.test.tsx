import React from "react";
import Item from "../components/Item";
import results from "./ItemListMock";
import { render } from "./test-utils";

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

describe("Random items' test", () => {
  it("Renders given title", () => {
    const component = render(<Item {...itemProps} />, { initialState });
    expect(component.getByTestId("item-title")).toHaveTextContent(
      itemProps.title
    );
  });
  it("Doesn't inform about playing if not playing", () => {
    const component = render(<Item {...itemProps} />, { initialState });
    expect(component.queryByText("item-title")).toBeNull();
  });
});

describe("Test Item component with 'collection' type, not playing", () => {
  it("Renders with three buttons: play, playlist, remove", () => {
    const component = render(<Item {...itemProps} type="collection" />, {
      initialState,
    });
    expect(component.getByTestId("collection-play-button")).toHaveTextContent(
      "Play"
    );
    expect(
      component.getByTestId("collection-playlist-button")
    ).toHaveTextContent("Playlist");
    expect(component.getByTestId("collection-remove-button")).toHaveTextContent(
      "Remove"
    );
  });
});

describe("Test Item component with 'search-result' type, not playing", () => {
  it("Renders with three buttons: play, playlist, collection", () => {
    const component = render(<Item {...itemProps} type="search-result" />, {
      initialState,
    });
    expect(component.getByTestId("search-play-button")).toHaveTextContent(
      "Play"
    );
    expect(component.getByTestId("search-playlist-button")).toHaveTextContent(
      "Playlist"
    );
    expect(component.getByTestId("search-collection-button")).toHaveTextContent(
      "In collection"
    );
  });
});

describe("Test Item component with 'playlist' type, not playing", () => {
  it("Renders with two buttons: move, remove", () => {
    const component = render(
      <Item {...itemProps} inTab={1} type="playlist" />,
      {
        initialState,
      }
    );
    expect(component.getByTestId("playlist-move-button")).toBeInTheDocument();
    expect(component.getByTestId("playlist-remove-button")).toBeInTheDocument();
  });
});
