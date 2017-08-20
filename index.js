require('dotenv-extended').load();
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const login = require('./components/login');

puppeteer.launch({ headless: process.env.APP_HEADLESS }).then(async browser => {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle' });
    await login.run(page);
    await page.screenshot({ path: 'example.png' })
    browser.close();
});