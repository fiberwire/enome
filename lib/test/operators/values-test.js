"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const values_1 = require("../../src/operators/values");
describe('operators', () => {
    describe('values', () => {
        it('Should produce an array of specified length of random values', () => {
            let vals = values_1.values(10);
            chai_1.expect(vals.length).to.eql(10);
            chai_1.expect(vals[0]).not.to.eql(vals[1]);
        });
    });
});
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/test/operators/values-test.js.map