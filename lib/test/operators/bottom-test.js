"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const _ = require("lodash");
const mocks_1 = require("../mocks");
const replenish_1 = require("operators/replenish");
const nucleotide_1 = require("genotypes/nucleotide");
const bottom_1 = require("operators/bottom");
describe('operators', () => {
    describe('bottom', () => {
        let { genomes, fitness } = mocks_1.mocks();
        beforeEach(() => {
            genomes = genomes.map(replenish_1.replenish);
        });
        it('should return the worst genomes from the provided array, according to provided fitness function', () => {
            //bottom 50% of genomes
            const b = bottom_1.bottom(genomes, 0.5, fitness);
            chai_1.expect(b.length).to.eql(genomes.length * 0.5);
            //top 50% of genomes
            const sorted = _.sortBy(genomes.map(fitness), e => e.fitness).reverse();
            const t = new nucleotide_1.Nucleotide(0.5).elements(sorted);
            chai_1.expect(t.length).to.eql(genomes.length * 0.5);
            const botAvgFitness = _.meanBy(b, e => e.fitness);
            const topAvgFitness = _.meanBy(t, e => e.fitness);
            //top is better on average than bottom
            chai_1.expect(botAvgFitness).to.be.at.most(topAvgFitness);
        });
    });
});
//# sourceMappingURL=bottom-test.js.map