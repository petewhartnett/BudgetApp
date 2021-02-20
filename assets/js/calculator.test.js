const {calculateSavings  } = require('./calculator');
const {calculateTotalIncome  } = require('./calculator');
const {calculateTotalCosts  } = require('./calculator');

describe("Calculator", () => {
    test("Total savings should be 10", () => {
        expect(calculateSavings(100,90)).toBe(10);
    });

    test("Total savings should be -10", () => {
        expect(calculateSavings(90, 100)).toBe(-10);
    });

    test("Total Income should be 1,000", () => {
        expect(calculateTotalIncome(100,1000)).toBe(1,100);
    });

    test("total income should be 100", () => {
        expect(calculateTotalIncome(36, 64)).toBe(100);
    });

    test("Total costs should be 430", () => {
        expect(() => calculateTotalCosts(400,30)).toBe(430);
    });
})