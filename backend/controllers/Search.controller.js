require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Entities = require("html-entities").XmlEntities;

const Search = {
  search: async (req, res) => {
    const { options, searchString } = req.body;

    let results = [],
      ytResults = [],
      viResults = [];
    const queryString = encodeURIComponent(searchString);
    const { isShort, sentBefore, websites } = options;

    const entities = new Entities();

    if (websites.includes("youtube")) {
      try {
        await axios
          .get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${queryString}&topicId=%2Fm%2F04rlf${
              sentBefore ? `&publishedAfter=${sentBefore}` : ""
            }&maxResults=25&order=viewCount&type=video&videoDuration=${
              isShort ? "short" : "medium"
            }&key=${process.env.YOUTUBE_SEARCH_KEY}`
          )
          .then((res) => {
            ytResults = res.data.items.map((i) => ({
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
            "An error occured while getting video links, try again in a minute",
        });
      }
    }

    if (websites.includes("vimeo")) {
      try {
        await axios
          .get(
            `https://api.vimeo.com/videos?query=${queryString}&sort=plays&page=1&per_page=12&fields=name,description,link&sort=relevant`,
            {
              headers: {
                Authorization: `bearer ${process.env.VIMEO_API_KEY}`,
              },
            }
          )
          .then((res) => {
            viResults = res.data.data.map((d) => ({
              title: entities.decode(d.name),
              desc: entities.decode(d.description),
              link: d.link,
            }));
            return res;
          });
      } catch (err) {
        console.log(err);
        res.json({
          error:
            "An error occured while getting video links, try again in a minute",
        });
      }
    }

    if (ytResults.length && viResults.length) {
      const interleave = ([x, ...xs], ys = []) =>
        x === undefined ? ys : [x, ...interleave(ys, xs)];

      results = interleave(ytResults, viResults);
    }

    if (ytResults.length && viResults.length === 0) {
      results = ytResults;
    }

    if (viResults.length && ytResults.length === 0) {
      results = viResults;
    }

    res.json({ items: results });

    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Search failed on the server" });
    }
  },
};

module.exports = Search;
