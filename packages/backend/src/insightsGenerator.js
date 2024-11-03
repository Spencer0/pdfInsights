"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomInsights = void 0;
const generateRandomInsights = () => {
    return {
        totalIncome: Math.floor(Math.random() * 1000000),
        totalExpenses: Math.floor(Math.random() * 1000000),
        netSavings: Math.floor(Math.random() * 1000000),
    };
};
exports.generateRandomInsights = generateRandomInsights;
