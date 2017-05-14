"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_1 = require("../../src/operators/best");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const replenish_1 = require("../../src/operators/replenish");
require("mocha");
describe('operators', () => {
    describe('best', () => {
        let { genomes, fitness } = mocks_1.mocks();
        beforeEach(() => {
            genomes = genomes.map(replenish_1.replenish);
        });
        it('should return the best genome from the provided array, according to provided fitness function', () => {
            let b = best_1.best(genomes, fitness);
            let better = genomes.filter(g => fitness(g).fitness > b.fitness);
            chai_1.expect(better.length).to.eql(0);
        });
    });
});
//# sourceMappingURL=best-test.js.map