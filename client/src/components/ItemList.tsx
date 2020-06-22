import React, { useState } from "react";
import Item from "./Item";
import prepeareToPagination from "./../utils/prepeareToPagination";
import SinglePlaylist from "./SinglePlaylist";
import Pagination from "@material-ui/lab/Pagination";
import { useCommonStyles } from "./../views/Root";
import { makeStyles, Box } from "@material-ui/core";
import theme from "../styles/theme";
import Divider from "./Divider";
import { connect } from "react-redux";
import { moveInPlaylistRequest as moveInPlaylistRequestAction } from "./../actions/index";

const useStyles = makeStyles({
  playlist: {
    position: "relative",
    top: "-10px0",
    left: 0,
    "& .divider": {
      position: "absolute",
      top: "-10000em",
      left: 0,
      height: "5px",
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      zIndex: 99999999999,
    },
  },
});

interface ItemListProps {
  fromItems: Item[];
  activeTab: number;
  itemsPerPage: number;
  playlists?: Playlist[];
  type: string;
  rmPlaylist?: (id: number, vidId: number) => void;
  moveInPlaylistRequest: (id: number, vidId: number, toVid: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  fromItems,
  activeTab,
  itemsPerPage,
  type,
  rmPlaylist,
  moveInPlaylistRequest,
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const prepearedItems = prepeareToPagination(fromItems, itemsPerPage);
  const [paginationOn, setPaginationOn] = useState<number>(1);

  const handleMoveItem = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    const currentHeight = e.currentTarget.getBoundingClientRect().height;
    const currentDividerH =
      e.currentTarget.getBoundingClientRect().top + currentHeight;
    const currentId = Number(e.currentTarget.getAttribute("data-num"));

    const allHeights = (Array.from(
      document.querySelectorAll("#playlist [data-type='item']")
    ) as HTMLDivElement[]).map((i) => {
      const item = {
        id: Number(i.getAttribute("data-num")),
        height: i.getBoundingClientRect().height,
        dividerH:
          i.getBoundingClientRect().top + i.getBoundingClientRect().height,
      };
      return item;
    });

    const bodyEl = document.querySelector("#main-body");
    bodyEl?.classList.add("scroll-lock");

    let target: {
      id: number;
      height: number;
      dividerH: number;
    } = {
      id: Number(currentId),
      height: currentHeight,
      dividerH: currentDividerH,
    };
    const playlist = document.getElementById("playlist");

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const yPos =
        e instanceof MouseEvent
          ? (e as MouseEvent).clientY
          : (e as TouchEvent).touches[0].clientY;

      if (yPos < allHeights[0].dividerH - allHeights[0].height / 2) {
        target = {
          id: -1,
          height: allHeights[0].height,
          dividerH: (playlist as HTMLDivElement).getBoundingClientRect().top,
        };
      }
      if (yPos > allHeights[allHeights.length - 1].dividerH) {
        target = {
          id: allHeights[allHeights.length - 1].id,
          height: allHeights[allHeights.length - 1].height,
          dividerH: allHeights[allHeights.length - 1].dividerH,
        };
      }
      for (let i = 0; i < allHeights.length - 1; i++) {
        if (
          yPos > allHeights[i].dividerH - allHeights[i].height / 2 &&
          yPos < allHeights[i].dividerH + allHeights[i].height / 2
        ) {
          target = {
            id: i,
            height: allHeights[i].height,
            dividerH: allHeights[i].dividerH,
          };
          break;
        }
      }

      (document.querySelector("#divider") as HTMLDivElement).style.top = `${
        target.dividerH -
        (playlist as HTMLDivElement).getBoundingClientRect().top
      }px`;
    };

    const handleReplacePosition = () => {
      (document.querySelector("#divider") as HTMLDivElement).style.top =
        "-10000em";
      moveInPlaylistRequest(activeTab - 1, currentId, target.id);
      bodyEl?.classList.remove("scroll-lock");
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleReplacePosition);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleReplacePosition);
    };

    if (e.type === "mousedown") {
      document.addEventListener("mousemove", handleMove);
    }
    if (e.type === "touchstart") {
      document.addEventListener("touchmove", handleMove);
    }

    if (e.type === "mousedown") {
      document.addEventListener("mouseup", handleReplacePosition);
    }
    if (e.type === "touchstart") {
      document.addEventListener("touchend", handleReplacePosition);
    }
  };

  const displayItems =
    activeTab === 0
      ? prepearedItems.pages === 1
        ? (prepearedItems.results as Item[]).map((it: Item) => (
            <Item
              key={`i-col-${type}-${it.id}`}
              type={type}
              title={it.title}
              desc={it.desc}
              link={it.link}
              added={it.added}
              onMove={handleMoveItem}
              num={it.id}
              inTab={activeTab}
              playing={it.playing as boolean}
            />
          ))
        : (prepearedItems.results as Item[][]).map((p: Item[]) => {
            const page = p.map((it: Item) => (
              <Item
                key={`i-col-${type}-${it.id}`}
                type={type}
                title={it.title}
                desc={it.desc}
                link={it.link}
                added={it.added}
                onMove={handleMoveItem}
                num={it.id}
                inTab={activeTab}
                playing={it.playing as boolean}
              />
            ));
            return page;
          })
      : prepearedItems.pages === 1
      ? (prepearedItems.results as Item[]).map((it: Item) => (
          <Item
            key={`i-pl-${type}-${it.id}`}
            type={type}
            title={it.title}
            desc={it.desc}
            link={it.link}
            added={it.added}
            onRemove={() =>
              (rmPlaylist as (id: number, vidId: number) => void)(
                activeTab - 1,
                it.id
              )
            }
            onMove={handleMoveItem}
            num={it.id}
            inTab={activeTab}
            playing={it.playing as boolean}
          />
        ))
      : (prepearedItems.results as Item[][]).map((pl: Item[]) => {
          const page = pl.map((it: Item) => (
            <Item
              key={`i-pl-${type}-${it.id}`}
              type={type}
              title={it.title}
              desc={it.desc}
              link={it.link}
              added={it.added}
              onRemove={() =>
                (rmPlaylist as (id: number, vidId: number) => void)(
                  activeTab - 1,
                  it.id
                )
              }
              onMove={handleMoveItem}
              num={it.id}
              inTab={activeTab}
              playing={it.playing as boolean}
            />
          ));
          return page;
        });
  return (
    <Box id="playlist" className={classes.playlist}>
      <SinglePlaylist value={activeTab} index={activeTab}>
        <Divider id="divider" className="divider" />
        {prepearedItems.pages > 1
          ? displayItems[paginationOn - 1]
          : displayItems}
      </SinglePlaylist>
      <div className={commonClasses.paginationContainer}>
        {prepearedItems.pages > 1 && (
          <Pagination
            variant="outlined"
            shape="rounded"
            onChange={(e, p) => setPaginationOn(p)}
            count={prepearedItems.pages}
            size="small"
            page={paginationOn}
            hideNextButton={true}
            hidePrevButton={true}
          />
        )}
      </div>
    </Box>
  );
};

const mapDispatchToProps = (dispatch: (arg0: Action) => unknown) => ({
  moveInPlaylistRequest: (id: number, vidId: number, toVid: number) =>
    dispatch(moveInPlaylistRequestAction(id, vidId, toVid)),
});

const mapStateToProps = (state: StateProps) => {
  const { playlists } = state;
  return {
    playlists,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
