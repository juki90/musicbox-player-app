require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Entities = require("html-entities").XmlEntities;

const Search = {
  search: async (req, res) => {
    const { options, searchString } = req.body;

    let results, yt_results;
    const queryString = encodeURIComponent(searchString);
    const { isShort, sentBefore, websites } = options;

    const entities = new Entities();

    if (websites.includes("youtube")) {
      try {
        await axios
          .get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${queryString}&topicId=%2Fm%2F04rlf${
              sentBefore ? `&publishedBefore=${sentBefore}` : ""
            }&maxResults=25&order=viewCount&type=video&videoDuration=${
              isShort ? "short" : "long"
            }&key=${process.env.YOUTUBE_SEARCH_KEY}`
          )
          .then((res) => {
            yt_results = [...res.data.items].map((i) => ({
              title: entities.decode(i.snippet.title),
              desc: entities.decode(i.snippet.description),
              link: `https://www.youtube.com/watch?v=${i.id.videoId}`,
            }));
            return res;
          });
      } catch (err) {
        console.log(err);
        res.json({
          error:
            "An error occured while getting video links, try again in a few seconds",
        });
      }
    }

    res.json({ items: yt_results });

    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Search failed on the server" });
    }
  },
};

module.exports = Search;
