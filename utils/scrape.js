const puppeteer = require('puppeteer');

const store_data = async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.shoppersstop.com/store-finder');
    const storeLocations = await page.evaluate(() => {
        const data = document.querySelector('#map_canvas');
        return data.getAttribute('data-stores');
    });
    await browser.close();
    return JSON.parse(storeLocations);
}

module.exports = store_data;