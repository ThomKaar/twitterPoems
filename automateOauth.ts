import puppeteer from 'puppeteer';
import { EMAIL, USERNAME, PASSWORD } from './secrets/twitterSecrets';

// Given a url and an action go to the page and perform an action
const navAndExecute = (async (url, action) => {
    const browser = await puppeteer.launch({ headless: false }) // get a browser
    let page = await browser.newPage();

    // login to Twitter
    page = await inputCredentials(page);
    
    // go to auth url
    await page.goto(url); // nav
    try {
        return await action(page);
    } catch(err) {
        console.log('error within navAndExecute action:', err)
    } finally {
        await browser.close();
    }
        
});


const clickAllowAndReturnCode = async (page) => {
    await page.locator('#allow').click();
    return await page.locator('#oauth_pin code').map((code) => code.innerText).wait();
};

export const generateOauthToken = async (url) => { 
    const code = await navAndExecute(url, clickAllowAndReturnCode);
    return code;
};


// given a puppeteer page object login to twitter on that page.mka
const inputCredentials = async (page) => {
    await page.goto("https://twitter.com/i/flow/login");
    await new Promise(r => setTimeout(r, 2000));
    await page.focus('input[autocomplete="username"]');
    await page.type('input[autocomplete="username"]', USERNAME, { delay: 50 });
    // press the Next button
    await page.evaluate(() =>
      document.querySelectorAll('button[role="button"]')[3].click()
    );

    await new Promise(r => setTimeout(r, 2000));
    // handle sus attempts
    const extractedText = await page.$eval("*", (el) => el.innerText);
    if (extractedText.includes("Enter your phone number or email address")) {
        await page.type('input[name="text"]', EMAIL, { delay: 50 });
        await page.evaluate(() => {
            document.querySelectorAll('button[role="button"]').forEach((button) => {
                if (button.innerText === 'Next') {
                    button.click();
                }
            });
        });
    }

    await new Promise(r => setTimeout(r, 1000));
    // input password
    await page.focus('input[name="password"]');
    await page.type('input[name="password"]', PASSWORD, { delay: 50 });
    // press the Login button
    await page.evaluate(() => {
        document.querySelectorAll('button[role="button"]').forEach((btn) => {
            if(btn.innerText === 'Log in') {
                btn.click();
            }
        });
    });
    return page;
};