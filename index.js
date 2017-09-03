require('dotenv-extended').load();
const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const login = require('./components/login');
const search = require('./components/search');
const like = require('./components/like');

puppeteer.launch({
    headless: process.env.APP_HEADLESS
}).then(async browser => {
    global.config = JSON.parse(await fs.readFile(process.env.APP_CONFIG_FILE, 'utf-8'));
    await fs.remove("./node_modules/puppeteer/.dev_profile1");
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle' });
    await login.run(page);
    // Like by hashtags
    for (let tag of config.hashtags.list) {
        await search.byHashtag(page, '#' + tag, config.hashtags.limit);
        await like.run(page, config.hashtags.limit);
    }
    browser.close();
}).catch(e => {
    console.log(e);
    process.exit(1);
});