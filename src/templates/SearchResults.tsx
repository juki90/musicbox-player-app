import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Item from "./../components/Item";
import { Typography, Button, makeStyles } from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AppsIcon from "@material-ui/icons/Apps";
import Pagination from "@material-ui/lab/Pagination";
import { useCommonStyles } from "../views/Root";
import theme from "../styles/theme";
import { addToCollection as addToCollectionAction } from "../actions";
import { connect } from "react-redux";
import prepeareToPagination from "../utils/prepeareToPagination";

const useStyles = makeStyles({
  viewOptions: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
});

interface SearchResultsProps {
  collection: Item[];
  addToCollection: (item: Item) => void;
}

const results: any[] = [
  {
    id: 0,
    added: new Date(2020, 5, 3, 9, 20),
    link: "https://www.youtube.com/watch?v=fMR6pXMCMYo",
    title: "Tiësto - Adagio For Strings",
    desc: `Stream & Download: https://tiesto.choons.at/justbe
  
  Subscribe to Black Hole Recordings TV : ‪http://bit.ly/SubscribeToYoutube‬
  Spotify: ‪http://bit.ly/BlackHoleSpotify‬
  Facebook: ‪https://www.facebook.com/blackholerec...
  Twitter: ‪http://twitter.com/BlackHoleRec‬`,
  },
  {
    id: 1,
    added: new Date(2020, 5, 3, 9, 22),
    link: "https://www.youtube.com/watch?v=DdyRdo4zek8",
    title: "Tiësto - Traffic (Original Mix)",
    desc: `Follow Tiësto's Club on:
  Facebook: https://www.facebook.com/onlinetiesto
  Twitter: https://twitter.com/tiestosclub
  Mixify: http://www.mixify.com/tiestosclub
  SoundCloud: https://soundcloud.com/denisvirtualmix
  And subcribe our YouTube channel for more: Music, Mixes and Remixes: http://www.youtube.com/denisvirtualmix`,
  },
  {
    id: 2,
    added: new Date(2020, 5, 3, 9, 25),
    link: "https://www.youtube.com/watch?v=mfJhMfOPWdE",
    title: "Armin van Buuren - Blah Blah Blah (Official Lyric Video)",
    desc: `My new single 'All On Me' is OUT NOW ▶ https://AvBBH.lnk.to/AllOnMeYA
    Subscribe to Armin van Buuren's YouTube channel via http://bit.ly/SubscribeArmin
    
    Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah.
    
    ALL WE EVER HEAR FROM YOU IS BLAH BLAH BLAH 
    ALL WE EVER DO IS GO JA JA JA 
    AND WE DON'T EVEN CARE ABOUT WHAT THEY SAY 
    CAUSE IT'S JA JA JA JA
    BLAH BLAH BLAH BLAH
    
    Connect with Armin van Buuren
    ▶ https://www.instagram.com/arminvanbuuren
    ▶ https://www.facebook.com/arminvanbuuren
    ▶ https://www.twitter.com/arminvanbuuren
    ▶ https://www.arminvanbuuren.com
    
    #ArminvanBuuren
    #BlahBlahBlah
    #ArmadaMusic`,
  },
  {
    id: 3,
    added: new Date(2020, 5, 3, 9, 20),
    link: "https://www.youtube.com/watch?v=fMR6pXMCMYo",
    title: "Tiësto - Adagio For Strings",
    desc: `Stream & Download: https://tiesto.choons.at/justbe
  
  Subscribe to Black Hole Recordings TV : ‪http://bit.ly/SubscribeToYoutube‬
  Spotify: ‪http://bit.ly/BlackHoleSpotify‬
  Facebook: ‪https://www.facebook.com/blackholerec...
  Twitter: ‪http://twitter.com/BlackHoleRec‬`,
  },
  {
    id: 4,
    added: new Date(2020, 5, 3, 9, 22),
    link: "https://www.youtube.com/watch?v=fMR6pXMCMYo",
    title: "Tiësto - Traffic (Original Mix)",
    desc: `Follow Tiësto's Club on:
  Facebook: https://www.facebook.com/onlinetiesto
  Twitter: https://twitter.com/tiestosclub
  Mixify: http://www.mixify.com/tiestosclub
  SoundCloud: https://soundcloud.com/denisvirtualmix
  And subcribe our YouTube channel for more: Music, Mixes and Remixes: http://www.youtube.com/denisvirtualmix`,
  },
  {
    id: 5,
    added: new Date(2020, 5, 3, 9, 25),
    link: "https://www.youtube.com/watch?v=mfJhMfOPWdE",
    title: "Armin van Buuren - Blah Blah Blah (Official Lyric Video)",
    desc: `My new single 'All On Me' is OUT NOW ▶ https://AvBBH.lnk.to/AllOnMeYA
    Subscribe to Armin van Buuren's YouTube channel via http://bit.ly/SubscribeArmin
    
    Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah.
    
    ALL WE EVER HEAR FROM YOU IS BLAH BLAH BLAH 
    ALL WE EVER DO IS GO JA JA JA 
    AND WE DON'T EVEN CARE ABOUT WHAT THEY SAY 
    CAUSE IT'S JA JA JA JA
    BLAH BLAH BLAH BLAH
    
    Connect with Armin van Buuren
    ▶ https://www.instagram.com/arminvanbuuren
    ▶ https://www.facebook.com/arminvanbuuren
    ▶ https://www.twitter.com/arminvanbuuren
    ▶ https://www.arminvanbuuren.com
    
    #ArminvanBuuren
    #BlahBlahBlah
    #ArmadaMusic`,
  },
  {
    id: 6,
    added: new Date(2020, 5, 3, 9, 20),
    link: "https://www.youtube.com/watch?v=fMR6pXMCMYo",
    title: "Tiësto - Adagio For Strings",
    desc: `Stream & Download: https://tiesto.choons.at/justbe
  
  Subscribe to Black Hole Recordings TV : ‪http://bit.ly/SubscribeToYoutube‬
  Spotify: ‪http://bit.ly/BlackHoleSpotify‬
  Facebook: ‪https://www.facebook.com/blackholerec...
  Twitter: ‪http://twitter.com/BlackHoleRec‬`,
  },
  {
    id: 7,
    added: new Date(2020, 5, 3, 9, 22),
    link: "https://www.youtube.com/watch?v=fMR6pXMCMYo",
    title: "Tiësto - Traffic (Original Mix)",
    desc: `Follow Tiësto's Club on:
  Facebook: https://www.facebook.com/onlinetiesto
  Twitter: https://twitter.com/tiestosclub
  Mixify: http://www.mixify.com/tiestosclub
  SoundCloud: https://soundcloud.com/denisvirtualmix
  And subcribe our YouTube channel for more: Music, Mixes and Remixes: http://www.youtube.com/denisvirtualmix`,
  },
  {
    id: 8,
    added: new Date(2020, 5, 3, 9, 25),
    link: "https://www.youtube.com/watch?v=mfJhMfOPWdE",
    title: "Armin van Buuren - Blah Blah Blah (Official Lyric Video)",
    desc: `My new single 'All On Me' is OUT NOW ▶ https://AvBBH.lnk.to/AllOnMeYA
    Subscribe to Armin van Buuren's YouTube channel via http://bit.ly/SubscribeArmin
    
    Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah.
    
    ALL WE EVER HEAR FROM YOU IS BLAH BLAH BLAH 
    ALL WE EVER DO IS GO JA JA JA 
    AND WE DON'T EVEN CARE ABOUT WHAT THEY SAY 
    CAUSE IT'S JA JA JA JA
    BLAH BLAH BLAH BLAH
    
    Connect with Armin van Buuren
    ▶ https://www.instagram.com/arminvanbuuren
    ▶ https://www.facebook.com/arminvanbuuren
    ▶ https://www.twitter.com/arminvanbuuren
    ▶ https://www.arminvanbuuren.com
    
    #ArminvanBuuren
    #BlahBlahBlah
    #ArmadaMusic`,
  },
  {
    id: 9,
    added: new Date(2020, 5, 3, 9, 20),
    link: "https://www.youtube.com/watch?v=fMR6pXMCMYo",
    title: "Tiësto - Adagio For Strings",
    desc: `Stream & Download: https://tiesto.choons.at/justbe
  
  Subscribe to Black Hole Recordings TV : ‪http://bit.ly/SubscribeToYoutube‬
  Spotify: ‪http://bit.ly/BlackHoleSpotify‬
  Facebook: ‪https://www.facebook.com/blackholerec...
  Twitter: ‪http://twitter.com/BlackHoleRec‬`,
  },
  {
    id: 10,
    added: new Date(2020, 5, 3, 9, 22),
    link: "https://www.youtube.com/watch?v=fMR6pXMCMYo",
    title: "Tiësto - Traffic (Original Mix)",
    desc: `Follow Tiësto's Club on:
  Facebook: https://www.facebook.com/onlinetiesto
  Twitter: https://twitter.com/tiestosclub
  Mixify: http://www.mixify.com/tiestosclub
  SoundCloud: https://soundcloud.com/denisvirtualmix
  And subcribe our YouTube channel for more: Music, Mixes and Remixes: http://www.youtube.com/denisvirtualmix`,
  },
  {
    id: 11,
    added: new Date(2020, 5, 3, 9, 25),
    link: "https://www.youtube.com/watch?v=mfJhMfOPWdE",
    title: "Armin van Buuren - Blah Blah Blah (Official Lyric Video)",
    desc: `My new single 'All On Me' is OUT NOW ▶ https://AvBBH.lnk.to/AllOnMeYA
    Subscribe to Armin van Buuren's YouTube channel via http://bit.ly/SubscribeArmin
    
    Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah.
    
    ALL WE EVER HEAR FROM YOU IS BLAH BLAH BLAH 
    ALL WE EVER DO IS GO JA JA JA 
    AND WE DON'T EVEN CARE ABOUT WHAT THEY SAY 
    CAUSE IT'S JA JA JA JA
    BLAH BLAH BLAH BLAH
    
    Connect with Armin van Buuren
    ▶ https://www.instagram.com/arminvanbuuren
    ▶ https://www.facebook.com/arminvanbuuren
    ▶ https://www.twitter.com/arminvanbuuren
    ▶ https://www.arminvanbuuren.com
    
    #ArminvanBuuren
    #BlahBlahBlah
    #ArmadaMusic`,
  },
];

const SearchResults: React.FC<SearchResultsProps> = ({
  collection,
  addToCollection,
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [gridOn, setGridOn] = useState<boolean>(false);
  const [paginationOn, setPaginationOn] = useState<number>(0);
  const prepearedResults = prepeareToPagination(results);
  const handleAddToCollection = (it: {
    link: string;
    title: string;
    desc: string;
  }) => {
    const link = it.link;
    const title = it.title;
    const desc = it.desc;
    const added = new Date();
    addToCollection({
      title,
      link,
      desc,
      added,
      id: collection.length,
    });
  };
  const handleIsInCollection = (link: string) => {
    return collection.some((i) => {
      return i.link === link;
    });
  };

  const displayItems =
    prepearedResults.pages === 1
      ? prepearedResults.results.map((r: Item) => {
          const collected = handleIsInCollection(r.link);
          return (
            <Item
              key={`i-sr-${r.id}`}
              grid={gridOn}
              type="search-result"
              title={r.title}
              desc={r.desc}
              added={r.added}
              inCollection={collected}
              onAdd={
                !collected
                  ? (e) =>
                      handleAddToCollection({
                        title: r.title,
                        desc: r.desc,
                        link: r.link,
                      })
                  : undefined
              }
            />
          );
        })
      : prepearedResults.results.map((p: any) => {
          const page = p.map((r: Item) => {
            const collected = handleIsInCollection(r.link);
            return (
              <Item
                key={`i-sr-${r.id}`}
                grid={gridOn}
                type="search-result"
                title={r.title}
                desc={r.desc}
                added={r.added}
                inCollection={collected}
                onAdd={
                  !collected
                    ? (e) =>
                        handleAddToCollection({
                          title: r.title,
                          desc: r.desc,
                          link: r.link,
                        })
                    : undefined
                }
              />
            );
          });
          return page;
        });

  return (
    <Box>
      <Box className={classes.viewOptions}>
        <Typography>Change view</Typography>
        <Button
          className={commonClasses.viewButton}
          variant="contained"
          size="large"
          color={!gridOn ? "primary" : "default"}
          startIcon={<FormatListBulletedIcon />}
          onClick={() => setGridOn(false)}
        ></Button>
        <Button
          className={commonClasses.viewButton}
          variant="contained"
          size="large"
          color={gridOn ? "primary" : "default"}
          startIcon={<AppsIcon />}
          onClick={() => setGridOn(true)}
        ></Button>
      </Box>
      <Grid container spacing={2}>
        {prepearedResults.pages > 1 ? displayItems[paginationOn] : displayItems}
      </Grid>
      {prepearedResults.pages > 1 && (
        <div className={commonClasses.paginationContainer}>
          <Pagination
            className={commonClasses.pagination}
            page={paginationOn}
            onChange={(e, p) => setPaginationOn(p - 1)}
            defaultPage={0}
            count={prepearedResults.pages}
            size="small"
          />
        </div>
      )}
    </Box>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { collection } = state;
  return { collection };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: any }) => any
) => ({
  addToCollection: (item: Item) => dispatch(addToCollectionAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
