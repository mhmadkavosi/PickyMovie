const express = require('express');
const morgan = require('morgan');
// scrapers
const scrapers = require('./src/server/scrapers/imdb');

const app = express();

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.use(morgan('dev'));
app.use(express.json());

app.get('/:movieName', async (req, res) => {
  // const movies = new Promise((resolve, reject) => {
  //   scrapers
  //     .scrapMovies(req.params.movieName)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((err) => console.log(err));
  // });

  // Promise.all([movies])
  //   .then((data) => {
  //     res.json(data);
  //   })
  //   .catch((err) => console.log(err));
  try {
    const movie = await scrapers.scrapMovies(req.params.movieName);
    res.json(movie);
  } catch (error) {
    console.log(error);
  }
  });

app.get('/movie/:imdbId', async (req, res) => {
  // const movie = new Promise((resolve, reject) => {
  //   scrapers
  //     .scrapMovie(req.params.imdbId)
  //     .then((data) => {
  //       resolve(data);
  //     })
  //     .catch((err) => console.log(err));
  // });

  // Promise.all([movie])
  //   .then((data) => {
  //     res.json(data);
  //   })
  //   .catch((err) => console.log(err));
  try {
    const movie = await scrapers.scrapMovie(req.params.imdbId);
    res.json(movie);
  } catch (error) {
    console.log(error);
  }
});

app.get('/movie/:imdbId', (req, res) => {
  const movie = new Promise((resolve, reject) => {
    scrapers
      .scrapMovie(req.params.imdbId)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => console.log(err));
  });

  Promise.all([movie])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
