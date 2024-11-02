const request = require('supertest');
const express = require('express');
const multer = require('multer');
const pdfProcessor = require('../pdfProcessor');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/pdfInsights', upload.single('file'), async (req, res) => {
    try {
        const insights = await pdfProcessor.processPDF(req.file.path);
        res.json(insights);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process PDF' });
    }
});

test('POST /pdfInsights', async () => {
    const tempFilePath = path.join(__dirname, 'test.pdf');
    // Create a simple PDF file for testing purposes
    fs.writeFileSync(tempFilePath, 'This is a test PDF file.'); // Replace this with actual PDF content if needed

    const response = await request(app)
        .post('/pdfInsights')
        .attach('file', tempFilePath);

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('insights');
});
