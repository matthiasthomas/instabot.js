const login = {
    run: async (page) => {
        await page.waitForSelector('a[class="_b93kq"]');
        await page.click('a[class="_b93kq"]', { delay: process.env.APP_CLICK_DELAY });
        await page.focus('input[name="username"]');
        await page.type(process.env.APP_USERNAME, { delay: process.env.APP_TYPE_DELAY });
        await page.focus('input[type="password"]');
        await page.type(process.env.APP_PASSWORD, { delay: process.env.APP_TYPE_DELAY });
        await page.click('button[class="_qv64e _gexxb _4tgw8 _njrw0"]', { delay: process.env.APP_CLICK_DELAY });
    }
};

module.exports = login;