"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const index_1 = require("../../src/index");
require("mocha");
describe('operators', () => {
    describe('top', () => {
        let { genomes, nsFitness } = mocks_1.mocks();
        beforeEach(() => {
            genomes = genomes.map(index_1.replenish);
        });
        it('should return the best genomes from the provided array, according to provided fitness function', () => {
            //top 50% of genomes
            const t = index_1.top(genomes, 0.5, nsFitness);
            chai_1.expect(t.length).to.eql(genomes.length * 0.5);
            //bottom 50% of genomes
            const sorted = _.sortBy(genomes.map(nsFitness), e => e.fitness);
            const b = new index_1.Nucleotide(0.5).elements(sorted);
            chai_1.expect(b.length).to.eql(genomes.length * 0.5);
            const topAvgFitness = _.meanBy(t, e => e.fitness);
            const botAvgFitness = _.meanBy(b, e => e.fitness);
            //top is better on average than bottom
            chai_1.expect(topAvgFitness).to.be.at.least(botAvgFitness);
        });
    });
});
//# sourceMappingURL=top-test.js.map