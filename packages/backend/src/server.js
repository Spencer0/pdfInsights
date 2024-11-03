"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const insightsGenerator_1 = require("./insightsGenerator");
// Import the generator function
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.post('/pdfInsights', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Hit Post Metrics");
        const insights = (0, insightsGenerator_1.generateRandomInsights)(); // Use the generator function
        res.json(insights);
    }
    catch (error) {
        console.log("Request Failed Metrics");
        res.status(500).send('Error processing PDF');
    }
}));
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
