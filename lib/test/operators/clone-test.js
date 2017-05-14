"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone_1 = require("../../src/operators/clone");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const replenish_1 = require("../../src/operators/replenish");
require("mocha");
describe('operators', () => {
    describe('clone', () => {
        let { genome } = mocks_1.mocks();
        beforeEach(() => {
            genome = replenish_1.replenish(genome);
        });
        it('should return an exact copy of the provided genome', () => {
            let c = clone_1.clone(genome);
            chai_1.expect(c).to.deep.equal(genome);
        });
    });
});
//# sourceMappingURL=clone-test.js.map