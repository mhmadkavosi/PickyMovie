const puppeteer = require('puppeteer');

const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
const MOVIE_ID = `tt7137846`;

(async () => {
  /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  /* Go to the IMDB Movie page and wait for it to load */
  await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });

  /* Run javascript inside of the page */
  const data = await page.evaluate(() => {
    const title = document.querySelector('div[class="title_wrapper"] > h1')
      .innerText;
    const timeWatch = document
      .querySelector('div[class="subtext"] > time')
      .innerText.trim();
  });

    return {
      title,
    };
})();
