"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const index_1 = require("../../src/index");
describe('operators', () => {
    describe('worst', () => {
        let { genomes, nsFitness } = mocks_1.mocks();
        beforeEach(() => {
            genomes = genomes.map(index_1.replenish);
        });
        it('should return the worst genome from the provided array, according to provided fitness function', () => {
            let w = index_1.worst(genomes, nsFitness);
            let worse = genomes.filter(g => nsFitness(g).fitness < w.fitness);
            chai_1.expect(worse.length).to.eql(0);
        });
    });
});
//# sourceMappingURL=worst-test.js.map