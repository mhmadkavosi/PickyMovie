const puppeteer = require('puppeteer');

const scrapMovie = async (movieId) => {
  const imdbUrl = `https://www.imdb.com/title/${movieId}/`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(imdbUrl, { waitUntil: 'domcontentloaded' });

  const scrapedData = await page.evaluate(() => {
    const title = document.querySelector('div[class="title_wrapper"] > h1')
      .innerText;
    const timeWatch = document
      .querySelector('div[class="subtext"] > time')
      .innerText.trim();
    const rating = document.querySelector('span[itemprop="ratingValue"]')
      .innerText;
    const ratingCount = document.querySelector('span[itemprop="ratingCount"]')
      .innerText;

    let genra = [];
    const genras = document.querySelectorAll('.subtext > a');
    [...genras].forEach((el) => {
      genra.push(el.innerText);
    });
    const releaseDate = [...genra].pop();
    genra = genra.slice(0, genra.length - 1);
    const shortStory = document
      .querySelector(
        '#title-overview-widget > div.plot_summary_wrapper.localized > div.plot_summary > div.summary_text.ready > div > div.plot-text'
      )
      .innerText.trim();
    const director = document.querySelector(
      '#title-overview-widget > div.plot_summary_wrapper.localized > div.plot_summary > div:nth-child(2) > a'
    ).innerText;

    let writers = [];
    const writer = document.querySelectorAll(
      '#title-overview-widget > div.plot_summary_wrapper.localized > div.plot_summary > div:nth-child(3) > a'
    );
    [...writer].forEach((el) => {
      writers.push(el.innerText);
    });

    let stars = [];
    const star = document.querySelectorAll(
      '#title-overview-widget > div.plot_summary_wrapper.localized > div.plot_summary > div:nth-child(4) > a'
    );
    [...star].forEach((el) => {
      stars.push(el.innerText);
    });
    stars = stars.slice(0, stars.length - 1);
    writers = writers.slice(0, stars.length - 1);

    const poster = document
      .querySelector(
        '#title-overview-widget > div.vital > div.slate_wrapper > div.poster > a > img'
      )
      .getAttribute('src');

    const trailer = document
      .querySelector(
        '#title-overview-widget > div.vital > div.slate_wrapper > div.slate > a'
      )
      .getAttribute('href');

    return {
      title,
      genra,
      poster,
      director,
      writers,
      stars,
      rating,
      ratingCount,
      timeWatch,
      releaseDate,
      shortStory,
      trailer: `https://www.imdb.com${trailer}`,
    };
  });

  await browser.close();
  return scrapedData;
};

const scrapMovies = async (movieName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.imdb.com/find?&s=tt&ttype=ft&q=${movieName}`;
  await page.goto(url, { waitUntil: 'networkidle0' });

  const scrapedData = await page.evaluate(() => {
    const movies = [];
    const moviesName = document.querySelectorAll(
      '#main > div > div.findSection > table > tbody > tr.findResult > td.result_text > a'
    );
    [...moviesName].forEach((el) => {
      movies.push(el.innerText);
    });
    const imdbID = [];
    const imdbIDs = document.querySelectorAll(
      '#main > div > div.findSection > table > tbody > tr.findResult > td.result_text > a'
    );
    [...imdbIDs].forEach((el) => {
      const movie = el.getAttribute('href').match(/title\/(.*)\//)[1];
      imdbID.push(movie);
    });
    const image = [];
    const images = document.querySelectorAll(
      '#main > div > div.findSection > table > tbody > tr.findResult > td.primary_photo > a > img'
    );
    [...images].forEach((el) => {
      const imageMovie = el.getAttribute('src');
      image.push(imageMovie);
    });
    const moviesInformation = [];
    for (let i = 0; i < movies.length; i++) {
      const movieInformation = {
        movieName: movies[i],
        imdbId: imdbID[i],
        image: image[i],
      };
      moviesInformation.push(movieInformation);
    }
    return moviesInformation;
  });

  await browser.close();
  return scrapedData;
};
const top250Movie = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.imdb.com/chart/top`;

  await page.goto(url, { waitUntil: 'networkidle0' });
  const scrapeData = await page.evaluate(() => {
    const titleAndRank = [];
    const titleAndRanks = document.querySelectorAll('td.titleColumn');
    [...titleAndRanks].forEach((el) => {
      titleAndRank.push(el.innerText);
    });

    const rating = [];
    const ratings = document.querySelectorAll('td.imdbRating > strong');
    [...ratings].forEach((el) => {
      rating.push(el.innerText);
    });

    const rankingMovieInfo = [];
    for (let i = 0; i < rating.length; i++) {
      const rankingMoviesInfo = {
        titleAndRankMovie: titleAndRank[i],
        ratingMovie: rating[i],
      };
      rankingMovieInfo.push(rankingMoviesInfo);
    }
    return rankingMovieInfo;
  });

  await browser.close();
  return scrapeData;
};

module.exports.scrapMovie = scrapMovie;
module.exports.scrapMovies = scrapMovies;
module.exports.top250Movie = top250Movie;
