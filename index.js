// this is the example from https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial
// index2.js is async/await version
// index3.js is improved version

const puppeteer = require('puppeteer');
function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setCookie({
                "name":"over18",
                "value":'18',
                'url':'https://news.ycombinator.com/'
            });
            await page.goto("https://news.ycombinator.com/");
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('a.storylink');
                items.forEach((item) => {
                    results.push({
                        url:  item.getAttribute('href'),
                        text: item.innerText,
                    });
                });
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);