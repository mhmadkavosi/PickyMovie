const puppeteer = require('puppeteer');

const url = (movieName) =`https://www.imdb.com/find?q=${movieName}&s=tt`;

const movieName = 'fight club';

(async () => { 

  const browser = await puppeteer.launch();
  const page = await browser.newPage();


    await page.goto(utl(movieName), { waitUntil: 'networkidle0' });
    
    const data = await page.evaluate(() => {
                
    })


  console.log(data);

  await browser.close();

})();