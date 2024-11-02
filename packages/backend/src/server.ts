
import express from 'express';
import multer from 'multer';
import { PDFInsights } from '../../common/src/PDFInsights';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/pdfInsights', upload.single('file'), async (req, res) => {
    try {
        console.log("Request Hit Post Metrics");
        const insights: PDFInsights = await process.processPDF(req.file.path);
        res.json(insights);
    } catch (error) {
        console.log("Request Failed Metrics");
        res.status(500).send('Error processing PDF');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
