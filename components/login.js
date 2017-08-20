const login = {
    run: async (page) => {
        await page.waitForSelector('a[class="_b93kq"]');
        await page.click('a[class="_b93kq"]', { delay: 50 });
        await page.focus('input[name="username"]');
        await page.type(process.env.APP_USERNAME, { delay: 600 });
        await page.focus('input[type="password"]');
        await page.type(process.env.APP_PASSWORD, { delay: 600 });
        await page.click('button[class="_qv64e _gexxb _4tgw8 _njrw0"]', { delay: 50 });
        await page.waitForNavigation();
    }
};

module.exports = login;