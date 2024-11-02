const express = require('express');
const multer = require('multer');
const pdfProcessor = require('./pdfProcessor');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Folder for uploaded files

app.post('/pdfInsights', upload.single('file'), async (req, res) => {
    try {
        console.log("Request Hit Post Metrics")
        const insights = await pdfProcessor.processPDF(req.file.path);
        res.json(insights);
    } catch (error) {
        console.log("Request Failed Metrics")
        res.status(500).send('Error processing PDF');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
