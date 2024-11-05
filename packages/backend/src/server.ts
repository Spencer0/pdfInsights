import express from 'express';
import multer from 'multer';
import { generateRandomInsights } from './insightsGenerator'; 
import { PDFInsights } from '../../common/models/PDFInsights';
// Import the generator function

const app = express();
const upload = multer({ dest: 'uploads/' });


//Handrolled cors policy


//Order Matters, keep this above the endpoints
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); //TODO make a backend env file
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
  

app.post('/pdfinsights', upload.single('file'), async (req, res) => {
    try {
        console.log("Request Hit Post Metrics");
        const insights: PDFInsights = generateRandomInsights(); // Use the generator function
        res.json(insights);
    } catch (error) {
        console.log("Request Failed Metrics");
        res.status(500).send('Error processing PDF');
    }
});

app.get('/healthcheck', async (req, res) => {
    console.log('Health check endpoint hit'); // Add this line
    try {
        res.status(200).json({ status: 'Healthy' }); 
    } catch (error) {
        res.status(500).json({ error: 'Health Check Failed' });
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
