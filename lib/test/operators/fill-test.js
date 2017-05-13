"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const fill_1 = require("operators/fill");
const mocks_1 = require("../mocks");
const replenish_1 = require("operators/replenish");
describe('operators', () => {
    describe('fill', () => {
        let { genomes } = mocks_1.mocks();
        beforeEach(() => {
            genomes = genomes.map(replenish_1.replenish);
        });
        it('should return a new array of genomes filled to a certain number with offspring of parents from original array', () => {
            let f = fill_1.fill(genomes, 20);
            chai_1.expect(f.length).to.eql(20);
        });
    });
});
//# sourceMappingURL=fill-test.js.map