"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const age_1 = require("../../../src/operators/parents/age");
const mocks_1 = require("../../mocks");
const chai_1 = require("chai");
require("mocha");
describe('operators', () => {
    describe('parents', () => {
        describe('age', () => {
            let { parent } = mocks_1.mocks();
            it('should increase parents age', () => {
                let age1 = parent.age;
                age_1.age(parent);
                let age2 = parent.age;
                chai_1.expect(age2).to.be.above(age1);
            });
        });
    });
});
//# sourceMappingURL=age-test.js.map