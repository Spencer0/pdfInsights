import { generateRandomInsights } from '../insightsGenerator';
import { PDFInsights } from '../../../common/src/PDFInsights';

describe('generateRandomInsights', () => {
    it('should return insights with values between 0 and 1,000,000', () => {
        const insights:PDFInsights = generateRandomInsights();
        expect(insights.totalIncome).toBeGreaterThanOrEqual(0);
        expect(insights.totalIncome).toBeLessThanOrEqual(1000000);
        expect(insights.totalExpenses).toBeGreaterThanOrEqual(0);
        expect(insights.totalExpenses).toBeLessThanOrEqual(1000000);
        expect(insights.netSavings).toBeGreaterThanOrEqual(0);
        expect(insights.netSavings).toBeLessThanOrEqual(1000000);
    });
});
