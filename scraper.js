'use strict';

const converter = require('json-2-csv');
const puppeteer = require('puppeteer');
const {saveFile} = require("./utils/file-save");

const GIT_HUB_ID = 'manojkumarboppisetti';
const GIT_HUB_URL = `https://github.com/${GIT_HUB_ID}?tab=repositories`;

(async () => {

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(GIT_HUB_URL);
    await page.setViewport({width: 1080, height: 1024});
    await page.waitForSelector('#user-repositories-list');
    // get repositories
    const repositoriesList = await page.evaluate(() => {
        const list = Array.from(document.querySelectorAll('a[itemprop="name codeRepository"]'));
        return list.map(item => {
            return {
                repo_name: item.textContent?.trim(),
                url: item.href,
            }
        });
    });
    await converter.json2csv(repositoriesList).then((data)=>{
        saveFile(data, GIT_HUB_ID + '-repositories');
    }).catch((err)=>{
        console.log(err);
    });
    await browser.close();
    console.log('done');
})();



// const tableData = await page.evaluate(() => {
//     const tds = Array.from(document.querySelectorAll('.t-td'));
//     return tds.map(td => td.textContent);
// });
// console.log('tableData "%s".', tableData);
