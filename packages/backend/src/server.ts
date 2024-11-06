import express from 'express';
import multer from 'multer';
import { generateRandomInsights } from './insightsGenerator'; 
import { PDFInsights } from '../../common/models/PDFInsights';
// Import the generator function

const app = express();
const upload = multer({ dest: 'uploads/' });


//Handrolled cors policy
//TODO Split backend into more than one file 
const allowedOrigins = [
    'http://localhost:3001',
    'https://spendsages.click',
    'https://www.spendsages.click'
  ];
  
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  
    res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    res.header('Access-Control-Allow-Methods', 
      'GET, POST, PUT, DELETE, OPTIONS');
    
    // Add additional security headers
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains'); // HSTS


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


app.get('/randomendpoint', async (req, res) => {
    console.log('randomendpoint hit'); 
    try {
        res.status(200).json({ status: '1' }); 
    } catch (error) {
        res.status(500).json({ error: 'randomendpoint Failed' });
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
