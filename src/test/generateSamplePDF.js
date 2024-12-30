const { generatePDF } = require('../utils/pdfGenerator');
const sampleInvoice = require('./sampleInvoice');
const path = require('path');
const fs = require('fs');

const testGeneratePDF = async () => {
    try {
        const pdfPath = await generatePDF(sampleInvoice);
        console.log(`PDF generated at: ${pdfPath}`);

        if (process.platform === 'win32') {
            // Windows
            require('child_process').exec(`start ${pdfPath}`);
        } else if (process.platform === 'darwin') {
            // macOS
            require('child_process').exec(`open ${pdfPath}`);
        } else if (process.platform === 'linux') {
            // Linux
            require('child_process').exec(`xdg-open ${pdfPath}`);
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

testGeneratePDF();