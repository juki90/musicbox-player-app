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

const results: Item[] = [
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
    added: new Date(2020, 5, 4, 9, 6),
    link: "https://www.youtube.com/watch?v=6UoNXz0Ox-g",
    title: "Armin van Buuren feat. Miri Ben-Ari - Intense",
    desc: `My new single 'All On Me' is OUT NOW ▶ https://AvBBH.lnk.to/AllOnMeYA
    Subscribe to Armin van Buuren's YouTube channel via http://bit.ly/SubscribeArmin
    
    An album that'll live on in the legacy of one of electronic dance music's biggest icons, Armin van Buuren. The fifth and most diverse artist album, loved for many reasons. A musical piece that surprises and inspires, and will continue to do so through its official remix and deluxe album: 'The More Intense edition'. Completing the story of 'Intense' with two brand new tracks, no less than 16 remixes by the likes of Protoculture, Dannic, Toby Hedges, Orjan Nilsen, Aly & Fila and more! Here it is, intensifying the journey that 'Intense' has started.
    
    Connect with Armin van Buuren 
    ▶ https://www.instagram.com/arminvanbuuren 
    ▶ https://www.facebook.com/arminvanbuuren 
    ▶ https://www.twitter.com/arminvanbuuren 
    ▶ https://www.arminvanbuuren.com 
    
    #ArminvanBuuren
    #Intense`,
  },
  {
    id: 4,
    added: new Date(2020, 5, 3, 9, 22),
    link: "https://www.youtube.com/watch?v=TxvpctgU_s8",
    title:
      "Armin van Buuren feat. Sharon den Adel - In And Out Of Love (Official Music Video)",
    desc: `Armin van Buuren's new album 'BALANCE' is OUT NOW: https://AvB.lnk.to/BalanceYA
    Subscribe to Armada TV: http://bit.ly/SubscribeArmada
    
    Right after summer, it's time for the full 'Mirage' album to take over. Inspired and influenced by many different types of music, 'Mirage' is more diverse than any other Armin album before. His collaboration with Sophie Ellis-Bextor, 'Not Giving Up On Love' is a perfect example of that, combining the best of both worlds. Armin:"The Nervo Sisters, Sophie Ellis-Bextor and me met up to write the vocals for 'Not Giving Up On Love'. I was thrilled to work with them on this. We gave it a more analog feel with some real drums, to give it a pop-rock feel. We also put a piano top line on the track and then the vocals of Sophie, which I think is a win. It's a lush summer tune with an epic vocal that gets stuck in your head and cheers you up!"
    
    'Mirage' is filled with musical fusions and surprising interpretations, from the orchestral masterpiece of title track 'Mirage', deep trance track 'I Don't Own You' and housy 'Feels So Good' to the eerie 'Take A Moment' and feel-good 'Drowning'. 16 tracks that highlight how Armin has matured as an artist.
    
    Connect with Armada Music
    ▶https://www.instagram.com/armadamusic
    ▶https://www.facebook.com/armadamusic
    ▶https://www.twitter.com/armada
    ▶https://www.soundcloud.com/armadamusic
    ▶https://www.armadamusic.com
    
    #ArmadaMusic
    #ArminvanBuuren
    #InAndOutOfLove`,
  },
  {
    id: 5,
    added: new Date(2020, 5, 3, 9, 25),
    link: "https://www.youtube.com/watch?v=8Fvq6Gd87so",
    title: "Sander van Doorn - Riff (Original Mix)",
    desc: `Download on Beatport: http://btprt.dj/RhWvBI
    Join Sander van Doorn on Facebook: http://on.fb.me/SandervanDoorn 
    Follow Sander van Doorn on Twitter: http://twitter.com/SandervanDoorn
    Join Sander on G+: http://gplus.to/sandervandoorn
    
    Subscribe to our Progressive House playlists on Spotify: http://spoti.fi/SpinninProgHouse
    ---
    
    The Spinnin’ Records YouTube channel is the home for all music videos of the world’s leading dance record label!
    
    We feature the latest music videos by Spinnin’ artists like Oliver Heldens, Sam Feldt, KSHMR, Ummet Ozcan, Blasterjaxx, Merk & Kremont, Timmy Trumpet, Tujamo, Alok, Curbi, Mike Williams, Lucas & Steve and many, many more! Expect daily uploads of official music videos, lyric videos and artwork videos across genres like dance, house, electro house, future house, deep house, big room and trap.
    
    Make sure to subscribe to Spinnin' Records: http://bit.do/spinnintv 
    ..and turn on notifications to stay updated with all new uploads!🔔
    
    Follow Spinnin’ Records:
    https://open.spotify.com/user/spinnin...
    https://soundcloud.com/spinninrecords
    https://facebook.com/SpinninRecords
    https://instagram.com/spinninrecords
    https://twitter.com/SpinninRecords
    https://spinninrecords.com`,
  },
  {
    id: 6,
    added: new Date(2020, 5, 3, 9, 20),
    link:
      "https://soundcloud.com/doornrecords/purple-haze-strangers-thing-out-now",
    title: "Purple Haze - Strangers Thing [OUT NOW]",
    desc: `Purple Haze - Strangers Thing is out now!
    
    Get it here: doornrecords.release.link/strangers-thing!SC
    `,
  },
  {
    id: 7,
    added: new Date(2020, 5, 3, 9, 22),
    link: "https://soundcloud.com/doornrecords/sander-van-doorn-firebeatz",
    title: "Sander van Doorn & Firebeatz - Guitar Track (Original Mix)",
    desc: `Sander van Doorn & Firebeatz proudly present Guitar Track. Download it HERE : btprt.dj/1dGjxKr

    We can now proudly announce Sander van Doorn & Firebeatz are responsible for this new look onto the big room sound, mixing progressive house elements seamlessly with sticky guitar riffs and the fattest electro basses and beats. MASSIVE!`,
  },
  {
    id: 8,
    added: new Date(2020, 5, 3, 10, 0),
    link: "https://vimeo.com/9578072",
    title: "Tiesto - Elements of Life ",
    desc: `This latest creation of mine is simply the most graphics orientated video. Utilizing the latest HD loop graphics by Digital Juice and the full power of Sony Vegas software, the result is simply amazing. Take note of the speed of graphics that coincides with the tempo of the dance music. Tiesto was introduce to me by Chery May last year and since then, na hook na ako sa kanyang mga mixes.

    Tiësto (Dutch pronunciation: [tiɛsto]; born Tijs Michiel Verwest [tɛɪs mixiɫ vərʋɛst] on January 17, 1969) is a Dutch musician, DJ and record producer of electronic dance music. Although he has used many aliases in the past, he is best known for his work as DJ Tiësto. On his latest productions, however, he has dropped the "DJ" label and is now known simply as "Tiësto", an alias which is an Italian twist of his childhood nickname.
    
    In 1997 he founded the label Black Hole Recordings with Arny Bink, where he released the Magik and In Search of Sunrise CD series. In 1999 and 2000 he collaborated with Ferry Corsten to create Gouryella. His 2000 remix of Delerium's "Silence" featuring Sarah McLachlan exposed him to more mainstream audiences. In 2001 he released his first solo album In My Memory which gave him several major hits that launched his career. He was named "World’s No.1 DJ" 3 consecutive times by DJ Magazine from 2002 through 2004.`,
  },
  {
    id: 9,
    added: new Date(2020, 5, 3, 9, 20),
    link: "https://vimeo.com/36669291",
    title: "Armin van Buuren - Orbion",
    desc: `This is an experimental video that I made with the track Orbion by Armin van Buuren.

    You can find more about him here.
    
    astateoftrance.com/‬`,
  },
  {
    id: 10,
    added: new Date(2020, 5, 3, 9, 22),
    link: "https://vimeo.com/77719214",
    title: "Armin van Buuren feat. Laura Jansen Sound of the Drums ",
    desc: ``,
  },
  {
    id: 11,
    added: new Date(2020, 5, 3, 9, 25),
    link: "https://soundcloud.com/doornrecords/purple-haze-choir-1-0",
    title: "Purple Haze - Choir 1.0",
    desc: `Purple Haze - Choir 1.0 is out now!
    
    Stream / download here: release.spinninrecords.com/choir-1-0!SC`,
  },
];

const SearchResults: React.FC<SearchResultsProps> = ({
  collection,
  addToCollection,
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [gridOn, setGridOn] = useState<boolean>(false);
  const [paginationOn, setPaginationOn] = useState<number>(1);
  const prepearedResults = prepeareToPagination(results as Item[], 10);
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
      ? (prepearedResults.results as Item[]).map((r: Item) => {
          const collected = handleIsInCollection(r.link);
          return (
            <Item
              key={`i-sr-${r.id}`}
              link={r.link}
              grid={gridOn}
              type="search-result"
              title={r.title}
              desc={r.desc}
              added={r.added}
              inCollection={collected}
              num={r.id}
              inTab={-1}
              onAdd={
                !collected
                  ? () =>
                      handleAddToCollection({
                        title: r.title,
                        desc: r.desc,
                        link: r.link,
                      })
                  : undefined
              }
              playing={r.playing as boolean}
            />
          );
        })
      : (prepearedResults.results as Item[][]).map((p: Item[]) => {
          const page = p.map((r: Item) => {
            const collected = handleIsInCollection(r.link);
            return (
              <Item
                key={`i-sr-${r.id}`}
                grid={gridOn}
                type="search-result"
                title={r.title}
                desc={r.desc}
                link={r.link}
                added={r.added}
                inCollection={collected}
                num={r.id}
                inTab={-1}
                onAdd={
                  !collected
                    ? () =>
                        handleAddToCollection({
                          title: r.title,
                          desc: r.desc,
                          link: r.link,
                        })
                    : undefined
                }
                playing={r.playing as boolean}
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
        >
          {" "}
        </Button>
        <Button
          className={commonClasses.viewButton}
          variant="contained"
          size="large"
          color={gridOn ? "primary" : "default"}
          startIcon={<AppsIcon />}
          onClick={() => setGridOn(true)}
        >
          {" "}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {prepearedResults.pages > 1
          ? displayItems[paginationOn - 1]
          : displayItems}
      </Grid>
      {prepearedResults.pages > 1 && (
        <div className={commonClasses.paginationContainer}>
          <Pagination
            variant="outlined"
            shape="rounded"
            page={paginationOn}
            onChange={(e, p) => setPaginationOn(p)}
            defaultPage={0}
            count={prepearedResults.pages}
            size="small"
            hideNextButton={true}
            hidePrevButton={true}
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

const mapDispatchToProps = (dispatch: (arg0: Action) => unknown) => ({
  addToCollection: (item: Item) => dispatch(addToCollectionAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
