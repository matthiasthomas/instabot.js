function getRandomInt(start, end) {
    return Math.floor(Math.random() * end) + start
}

const like = {
    // like n items
    run: async (page, n) => {
        for (let i = 1; i <= n; i++) {
            const post_el = 'div[class="_mck9w _gvoze _f2mse"]:nth-child(' + i + ')>a';
            await page.waitForSelector(post_el);
            await page.click(post_el, { delay: process.env.APP_CLICK_DELAY });
            const like_btn = 'a[class="_eszkz _l9yih"]';
            // Full _8scx2 coreSpriteHeartFull
            // Empty _8scx2 coreSpriteHeartOpen
            await page.waitForSelector(like_btn);
            const already_liked = await page.$(like_btn + '>span[class="_8scx2 coreSpriteHeartFull"]');
            if (!already_liked) {
                await page.waitForSelector(like_btn);
                await page.click(like_btn);
                // Comment if we need to (randomly add comment matching given probability)
                let comment_yes = (getRandomInt(1, 100) < global.config.comments.percentage);
                if (global.config.comments.list.length > 0 && global.config.comments.percentage > 0) {
                    const comment = global.config.comments.list[getRandomInt(0, global.config.comments.list.length - 1)];
                    const comment_textarea = 'textarea[class="_bilrf"]';
                    await page.waitForSelector(comment_textarea);
                    await page.click(comment_textarea, { delay: process.env.APP_CLICK_DELAY });
                    await page.type(comment, { delay: process.env.APP_TYPE_DELAY });
                    let comments_old = (await page.$$('li[class="_ezgzd"]')).length;
                    let comments_new = comments_old;
                    while (comments_old === comments_new) {
                        comments_new = (await page.$$('li[class="_ezgzd"]')).length;
                        await page.press("Enter");
                    }
                }
            }
            await page.screenshot({ path: 'example.png' })
            const close_post_btn = 'button[class="_dcj9f"]';
            await page.waitForSelector(close_post_btn);
            await page.click(close_post_btn, { delay: process.env.APP_CLICK_DELAY });
        }
    }
}

module.exports = like;