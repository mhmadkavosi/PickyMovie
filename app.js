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

