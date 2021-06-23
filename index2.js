const puppeteer = require('puppeteer');
async function run () {
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
        });
        browser.close();
        console.log(urls);
        return urls;
    } catch (e) {
        console.error(e);
    }
    
}

run();
