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
        await page.click('a.storylink');
        await page.waitFor('p');
        let urls = await page.evaluate(() => {
            // let article = document.querySelector('p');
            let article = document.querySelector('div.post article.post-content p');
            console.log(article);
            return article.textContent;
        });
        browser.close();
        console.log(urls);
        return urls;
    } catch (e) {
        console.error(e);
    }
    
}

run();
