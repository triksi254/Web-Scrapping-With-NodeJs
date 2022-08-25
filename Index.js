const Nightmare = require("nightmare");
const cheerio = require("cheerio");
const nightmare = Nightmare({ show: true });
const url = "https://www.flipkart.com/";
const data = [];
nightmare
    .goto(url)
    .wait("body")
    .click("div._3OO5Xc")
    .type("input._3704LK", "nodejs books")
    .click("button.L0Z3Pu")
    .wait("div._13oc-S")
    .evaluate(() => document.querySelector("body").innerHTML)
    .end()
    .then((response) => {
        console.log(getData(response));
    })
    .catch((err) => {
        console.log(err);
    });
let getData = (html) => {
    const $ = cheerio.load(html);
    $("div._13oc-S div div._4ddWXP a.s1Q9rs").each((i, elem) => {
        const title = $(elem).text();
        const link = $(elem).attr("href");
        data.push([title, link]);
    });
    console.log(data);
};