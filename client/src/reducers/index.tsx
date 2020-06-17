import {
  ADD_TO_COLLECTION_FAILED,
  ADD_TO_COLLECTION_SUCCESS,
  REMOVE_FROM_COLLECTION,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  ADD_NEW_PLAYLIST,
  RENAME_PLAYLIST,
  DELETE_PLAYLIST,
  SORT_PLAYLIST,
  MOVE_IN_PLAYLIST,
  PLAY_VIDEO,
  SKIP_TO_VIDEO,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REMOVE_NOTIFICATION,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions";
import { Reducer } from "redux";

const initialState: StateProps = {
  collection: [
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
  ],
  playlists: [
    {
      id: 0,
      items: [
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
          link:
            "https://soundcloud.com/doornrecords/sander-van-doorn-firebeatz",
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
      ],
      name: "First playlist",
    },
    {
      id: 1,
      items: [],
      name: "Second playlist",
    },
  ],
  inPlayer: undefined,
  loggedAs: "",
  message: {
    error: "",
    message: "",
  },
};

const rootReducer: Reducer<StateProps, Action> = (
  state: StateProps = initialState,
  action: Action
) => {
  switch (action.type) {
    case ADD_TO_COLLECTION_SUCCESS:
      let withAddedToCollection = [
        (action as addToCollectionSuccessAction).payload.item,
        ...state.collection,
      ].sort((a: Item, b: Item) => {
        const aDate = new Date(a.added);
        const bDate = new Date(b.added);
        return bDate.getTime() - aDate.getTime();
      });
      withAddedToCollection = withAddedToCollection.map(
        (c: Item, i: number) => {
          const cl = c;
          cl.id = i;
          return cl;
        }
      );
      return {
        ...state,
        collection: withAddedToCollection,
      };
    case REMOVE_FROM_COLLECTION:
      const withRemovedCollection = [...state.collection].filter((e) => {
        return e.id !== (action as removeFromCollectionAction).payload.id;
      });

      return {
        ...state,
        collection: withRemovedCollection.map((c: Item, i: number) => {
          const cl = c;
          cl.id = i;
          return cl;
        }),
      };
    case ADD_TO_PLAYLIST:
      const withAddedToPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as addToPlaylistAction).payload.id) {
          pl.items.push((action as addToPlaylistAction).payload.item);
          pl.items = pl.items.map((it, i) => {
            const item = it;
            item.id = i;
            return item;
          });
        }
        return pl;
      });
      return {
        ...state,
        playlists: withAddedToPlaylist,
      };
    case REMOVE_FROM_PLAYLIST:
      const withRemovedFromPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as removeFromPlaylistAction).payload.id) {
          pl.items = pl.items.filter(
            (i) => i.id !== (action as removeFromPlaylistAction).payload.vidId
          );
          pl.items = pl.items.map((it, i) => {
            const item = it;
            item.id = i;
            return item;
          });
        }
        return pl;
      });
      return {
        ...state,
        playlists: withRemovedFromPlaylist,
      };
    case ADD_NEW_PLAYLIST:
      const withNewPlaylist = [...state.playlists];
      withNewPlaylist.push({
        id: state.playlists.length,
        name: (action as addNewPlaylistAction).payload.name,
        items: [],
      });
      return {
        ...state,
        playlists: withNewPlaylist,
      };
    case RENAME_PLAYLIST:
      const withRenamedPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as renamePlaylistAction).payload.id) {
          pl.name = (action as renamePlaylistAction).payload.name;
        }
        return pl;
      });
      return {
        ...state,
        playlists: withRenamedPlaylist,
      };
    case DELETE_PLAYLIST:
      const withDeletedPlaylist = [...state.playlists].filter(
        (p) => p.id !== (action as deletePlaylistAction).payload.id
      );
      return {
        ...state,
        playlists: withDeletedPlaylist,
      };
    case SORT_PLAYLIST:
      const sortedItems = [...state.playlists].map((p) => {
        const pl = p;
        const way = (action as sortPlaylistAction).payload.way;
        if (
          pl.id === (action as sortPlaylistAction).payload.id &&
          way === "name"
        ) {
          pl.items = pl.items.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        }
        if (
          pl.id === (action as sortPlaylistAction).payload.id &&
          way === "name-reversed"
        ) {
          pl.items = pl.items.sort((a, b) => {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          });
        }
        if (
          pl.id === (action as sortPlaylistAction).payload.id &&
          way === "date"
        ) {
          pl.items = pl.items.sort((a, b) => {
            const aDate = new Date(a.added);
            const bDate = new Date(b.added);
            if (aDate.getTime() < bDate.getTime()) {
              return 1;
            }
            if (aDate.getTime() > bDate.getTime()) {
              return -1;
            }
            return 0;
          });
        }
        if (
          pl.id === (action as sortPlaylistAction).payload.id &&
          way === "date-reversed"
        ) {
          pl.items = pl.items.sort((a, b) => {
            const aDate = new Date(a.added);
            const bDate = new Date(b.added);
            if (aDate.getTime() < bDate.getTime()) {
              return -1;
            }
            if (aDate.getTime() > bDate.getTime()) {
              return 1;
            }
            return 0;
          });
        }
        pl.items = pl.items.map((it, i) => {
          const item = it;
          item.id = i;
          return item;
        });
        return pl;
      });
      return {
        ...state,
        playlists: sortedItems,
      };
    case MOVE_IN_PLAYLIST:
      const withMovedInPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as moveInPlaylistAction).payload.id) {
          pl.items.map((it) => {
            const item = it;
            if (item.id === (action as moveInPlaylistAction).payload.vidId) {
              item.id = (action as moveInPlaylistAction).payload.toVid + 0.5;
            }
            return item;
          });

          pl.items = pl.items.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });

          pl.items = pl.items.map((it, i) => {
            const item = it;
            item.id = i;
            return item;
          });
        }
        return pl;
      });
      return {
        ...state,
        playlists: withMovedInPlaylist,
      };
    case PLAY_VIDEO:
      if ((action as playVideoAction).payload.vidId === -1) {
        return {
          ...state,
          collection: state.collection.map((i) => {
            const item = i;
            item.playing = false;
            return item;
          }),
          playlists: state.playlists.map((pl) => {
            const playlist = pl;
            playlist.items = playlist.items.map((i) => {
              const item = i;
              item.playing = false;
              return item;
            });
            return playlist;
          }),
          inPlayer: undefined,
        };
      }

      const withPlayingVideo: Playlist[] | Item[] =
        (action as playVideoAction).payload.plId !== undefined
          ? state.playlists.map((pl) => {
              const playlist = pl;
              if (playlist.id === (action as playVideoAction).payload.plId) {
                playlist.items = playlist.items.map((i) => {
                  const item = i;
                  item.playing = false;
                  if (item.id === (action as playVideoAction).payload.vidId) {
                    item.playing = true;
                    item.fromPlaylist = playlist.id;
                  }
                  return item;
                });
              }
              return playlist;
            })
          : state.collection.map((i) => {
              const item = i;
              item.playing = false;
              if (item.id === (action as playVideoAction).payload.vidId) {
                item.playing = true;
              }
              return item;
            });

      return {
        ...state,
        collection:
          (action as playVideoAction).payload.plId !== undefined
            ? state.collection.map((i) => {
                const it = i;
                it.playing = false;
                return it;
              })
            : (withPlayingVideo as Item[]),
        playlists:
          (action as playVideoAction).payload.plId !== undefined
            ? (withPlayingVideo as Playlist[])
            : state.playlists.map((pl) => {
                const playlist = pl;
                playlist.items = playlist.items.map((i) => {
                  const it = i;
                  it.playing = false;
                  return it;
                });
                return playlist;
              }),
        inPlayer:
          (action as playVideoAction).payload.plId !== undefined
            ? state.playlists
                .filter(
                  (pl) =>
                    (pl.id === (action as playVideoAction).payload.plId) !==
                    undefined
                )[0]
                .items.filter(
                  (i) => i.id === (action as playVideoAction).payload.vidId
                )[0]
            : state.collection.filter(
                (i) => i.id === (action as playVideoAction).payload.vidId
              )[0],
      };

    case SKIP_TO_VIDEO:
      let collectionIdx = 0;
      let playlistIdx = 0;
      let playlistItemIdx = 0;
      const isInPlaylist =
        (action as skipToVideoAction).payload.inPlaylist !== undefined;
      const withSkippedVideo = isInPlaylist
        ? state.playlists.map((pl) => {
            const playlist = pl;
            if (
              (action as skipToVideoAction).payload.skipTo < 0 &&
              playlist.id === (action as skipToVideoAction).payload.inPlaylist
            ) {
              const plItems = [...playlist.items];
              playlist.items.forEach((it, i) => {
                if (plItems[i].playing) {
                  plItems[i - 1].playing = true;
                  plItems[i].playing = false;
                  playlistIdx = playlist.id;
                  playlistItemIdx = it.id - 1;
                }
              });
              playlist.items = plItems;
            }
            if (
              (action as skipToVideoAction).payload.skipTo > 0 &&
              playlist.id === (action as skipToVideoAction).payload.inPlaylist
            ) {
              const plItems = [...playlist.items];
              playlist.items.forEach((it, i) => {
                if (plItems[i].playing) {
                  playlistItemIdx = plItems[i].id + 1;
                  plItems[i].playing = false;
                  playlistIdx = playlist.id;
                }
              });
              plItems[playlistItemIdx].playing = true;
              playlist.items = plItems;
            }
            return playlist;
          })
        : state.collection.map((it) => {
            const item = it;
            if (
              (action as skipToVideoAction).payload.skipTo > 0 &&
              item.playing
            ) {
              item.playing = false;
              collectionIdx = item.id + 1;
            }
            if (
              (action as skipToVideoAction).payload.skipTo < 0 &&
              item.playing
            ) {
              item.playing = false;
              collectionIdx = item.id - 1;
            }
            return item;
          });

      let playingItem: Item;

      if (!isInPlaylist) {
        (withSkippedVideo[collectionIdx] as Item).playing = true;
        playingItem = { ...(withSkippedVideo[collectionIdx] as Item) };
      } else {
        playingItem = (withSkippedVideo[playlistIdx] as Playlist).items[
          playlistItemIdx
        ];
        playingItem.fromPlaylist = playlistIdx;
        playingItem = { ...playingItem };
      }

      return {
        ...state,
        collection: !isInPlaylist
          ? (withSkippedVideo as Item[])
          : state.collection,
        playlists: isInPlaylist
          ? (withSkippedVideo as Playlist[])
          : state.playlists,
        inPlayer: playingItem as Item,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: {
          ...state.message,
          message: "Successfully registered",
        },
        loggedAs: action.payload.name,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        collection: action.payload.collection,
        playlists: action.payload.playlists,
        loggedAs: action.payload.loggedAs,
        message: {
          error: "",
          message: action.payload.text,
        },
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case ADD_TO_COLLECTION_FAILED:
      return {
        ...state,
        message: {
          ...state.message,
          error: action.payload.text,
        },
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        message: {
          message: "",
          error: "",
        },
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedAs: "",
        message: {
          error: "",
          message: "You have been logged out",
        },
      };
  }
  return state;
};

export default rootReducer;
