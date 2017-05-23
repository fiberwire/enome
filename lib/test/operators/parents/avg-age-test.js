"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avg_age_1 = require("../../../src/operators/parents/avg-age");
const mocks_1 = require("../../mocks");
const chai_1 = require("chai");
require("mocha");
describe('operators', () => {
    describe('parents', () => {
        describe('avgAge', () => {
            let { parent, genome } = mocks_1.mocks();
            it('should return the average age of parents', () => {
                let parent2 = { genome, age: 3 };
                let avg = avg_age_1.avgAge([parent, parent2]);
                chai_1.expect(parent.age).to.eql(1);
                chai_1.expect(avg).to.eql(2);
            });
        });
    });
});
//# sourceMappingURL=avg-age-test.js.map