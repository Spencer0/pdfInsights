import { PDFInsights } from '../../common/models/PDFInsights';

export const generateRandomInsights = (): PDFInsights => {
    return {
        totalIncome: Math.floor(Math.random() * 1000000),
        totalExpenses: Math.floor(Math.random() * 1000000),
        netSavings: Math.floor(Math.random() * 1000000),
    };
};
