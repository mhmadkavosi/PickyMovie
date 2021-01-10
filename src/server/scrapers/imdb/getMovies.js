const puppeteer = require('puppeteer');

const url = (movieName) =>
  `https://www.imdb.com/find?q=${movieName}&s=tt&ttype=ft&ref_=fn_ft`;

const movieName = 'fight club';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url(movieName), { waitUntil: 'networkidle0' });

  const data = await page.evaluate(() => {
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
    return {
      moviesInformation,
    };
  });

  console.log(data);

  await browser.close();
})();
