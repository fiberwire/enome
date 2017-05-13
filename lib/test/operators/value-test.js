"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const value_1 = require("operators/value");
describe('operators', () => {
    describe('value', () => {
        it('Should produce a random value between 0 and 1', () => {
            let val = value_1.value();
            chai_1.expect(val).to.be.at.least(0);
            chai_1.expect(val).to.be.at.most(1);
        });
    });
});
//# sourceMappingURL=value-test.js.map