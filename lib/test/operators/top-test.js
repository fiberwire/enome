"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const _ = require("lodash");
const mocks_1 = require("../mocks");
const replenish_1 = require("operators/replenish");
const top_1 = require("operators/top");
const nucleotide_1 = require("genotypes/nucleotide");
describe('operators', () => {
    describe('top', () => {
        let { genomes, fitness } = mocks_1.mocks();
        beforeEach(() => {
            genomes = genomes.map(replenish_1.replenish);
        });
        it('should return the best genomes from the provided array, according to provided fitness function', () => {
            //top 50% of genomes
            const t = top_1.top(genomes, 0.5, fitness);
            chai_1.expect(t.length).to.eql(genomes.length * 0.5);
            //bottom 50% of genomes
            const sorted = _.sortBy(genomes.map(fitness), e => e.fitness);
            const b = new nucleotide_1.Nucleotide(0.5).elements(sorted);
            chai_1.expect(b.length).to.eql(genomes.length * 0.5);
            const topAvgFitness = _.meanBy(t, e => e.fitness);
            const botAvgFitness = _.meanBy(b, e => e.fitness);
            //top is better on average than bottom
            chai_1.expect(topAvgFitness).to.be.at.least(botAvgFitness);
        });
    });
});
//# sourceMappingURL=top-test.js.map