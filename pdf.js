const fs = require("fs");
const puppeteer = require("puppeteer");

const createPDF = async (user) => {
    const browser =  await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
        path: `./${user}.pdf`,
        format: "letter"
    };
    const content = fs.readFileSync(`./${user}.html`, "utf-8");

    await page.setContent(content, { waitUntil: "networkidle2" });

    await page.pdf(options);

    await browser.close();

    await console.log("profile PDF created");
}

module.exports = { createPDF : createPDF };