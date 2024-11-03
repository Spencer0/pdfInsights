"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insightsGenerator_1 = require("../insightsGenerator");
describe('generateRandomInsights', () => {
    it('should return insights with values between 0 and 1,000,000', () => {
        const insights = (0, insightsGenerator_1.generateRandomInsights)();
        expect(insights.totalIncome).toBeGreaterThanOrEqual(0);
        expect(insights.totalIncome).toBeLessThanOrEqual(1000000);
        expect(insights.totalExpenses).toBeGreaterThanOrEqual(0);
        expect(insights.totalExpenses).toBeLessThanOrEqual(1000000);
        expect(insights.netSavings).toBeGreaterThanOrEqual(0);
        expect(insights.netSavings).toBeLessThanOrEqual(1000000);
    });
});
