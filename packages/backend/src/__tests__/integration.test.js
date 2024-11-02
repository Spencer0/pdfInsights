const request = require('supertest');
const express = require('express');
const multer = require('multer');
const pdfProcessor = require('../pdfProcessor');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/pdfInsights', upload.single('file'), async (req, res) => {
    const insights = await pdfProcessor.processPDF(req.file.path);
    res.json(insights);
});

describe('Integration Tests', () => {
    test('should connect to the server on localhost:3000 and respond', async () => {
        try {
            const tempFilePath = path.join(__dirname, 'test.pdf');
            // Create a simple PDF file for testing purposes
            fs.writeFileSync(tempFilePath, 'This is a test PDF file.'); 
            const response = await request('http://localhost:3000')
            .post('/pdfInsights')
            .attach('file', tempFilePath);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('insights');
        } catch (error) {
            // Fail gracefully if the server is not running
            console.error('Could not connect to the server:', error.message);
            fail('Server is not running on localhost:3000');
        }
    });
});
