async function getList(page, element) {
    await page.waitForSelector(element);
    return await page.$$(element);
}

async function loadMore(page) {
    setTimeout(async () => {
        await page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight);
        });
    }, 1000);
}

const search = {
    byHashtag: async (page, hashtag, limit) => {
        const search_box = 'input[class="_avvq0 _o716c"]';
        await page.waitForSelector(search_box);
        await page.click(search_box, { delay: process.env.APP_CLICK_DELAY });
        await page.type(hashtag, { delay: process.env.APP_TYPE_DELAY })
        const tag_button = 'a[class="_gimca"]:first-child';
        await page.waitForSelector(tag_button, { visible: true });
        await page.click(tag_button, { delay: process.env.APP_CLICK_DELAY });
        const post_el = 'div[class="_mck9w _gvoze _f2mse"]>a'
        let count = (await getList(page, post_el)).length;
        // On first pass click on loadMore
        if (count < limit) {
            const load_more_btn = 'a[class="_1cr2e _epyes"]';
            await page.waitForSelector(load_more_btn);
            await page.click(load_more_btn, { delay: process.env.APP_CLICK_DELAY });
            // Then just scroll the page
            while (count < limit) {
                await loadMore(page);
                count = (await getList(page, post_el)).length;
            }
        }
    },
    byLocation: async (page, location) => {

    },
    byUsername: async (page, username) => {

    }
}

module.exports = search;