import React, { useState, useEffect } from "react";
import Item from "./Item";
import prepeareToPagination from "./../utils/prepeareToPagination";
import SinglePlaylist from "./SinglePlaylist";
import Pagination from "@material-ui/lab/Pagination";
import { useCommonStyles } from "./../views/Root";

interface ItemListProps {
  fromItems: Item[];
  activeTab: number;
  itemsPerPage: number;
  rmCollection: (link: string) => void;
  rmPlaylist: (id: number, link: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  fromItems,
  activeTab,
  itemsPerPage,
  rmCollection,
  rmPlaylist,
}) => {
  const commonClasses = useCommonStyles();
  const prepearedItems = prepeareToPagination(fromItems, itemsPerPage);
  const [paginationOn, setPaginationOn] = useState<number>(1);
  useEffect(() => {
    setPaginationOn(1);
  }, [activeTab]);
  const displayItems =
    activeTab === 0
      ? prepearedItems.pages === 1
        ? (prepearedItems.results as Item[]).map((it: Item) => (
            <Item
              key={`i-col-${it.id}`}
              type="playlist"
              title={it.title}
              desc={it.desc}
              link={it.link}
              added={it.added}
              onRemove={() => rmCollection(it.link)}
            />
          ))
        : (prepearedItems.results as Item[][]).map((p: Item[]) => {
            const page = p.map((it: Item) => (
              <Item
                key={`i-col-${it.id}`}
                type="playlist"
                title={it.title}
                desc={it.desc}
                link={it.link}
                added={it.added}
                onRemove={() => rmCollection(it.link)}
              />
            ));
            return page;
          })
      : prepearedItems.pages === 1
      ? (prepearedItems.results as Item[]).map((it: Item) => (
          <Item
            key={`i-pl-${it.id}`}
            type="playlist"
            title={it.title}
            desc={it.desc}
            link={it.link}
            added={it.added}
            onRemove={() => rmPlaylist(activeTab - 1, it.link)}
          />
        ))
      : (prepearedItems.results as Item[][]).map((pl: Item[]) => {
          const page = pl.map((it: Item) => (
            <Item
              key={`i-pl-${it.id}`}
              type="playlist"
              title={it.title}
              desc={it.desc}
              link={it.link}
              added={it.added}
              onRemove={() => rmPlaylist(activeTab - 1, it.link)}
            />
          ));
          return page;
        });
  return (
    <>
      <SinglePlaylist value={activeTab} index={activeTab}>
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
    </>
  );
};

export default ItemList;
