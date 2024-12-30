const puppeteer = require('puppeteer');
const { generatPDFTemplate } = require('./templates');

const generatePDFBuffer = async (invoice) => {
    const htmlContent = generatPDFTemplate(invoice);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    return pdfBuffer;
};

module.exports = { generatePDFBuffer };