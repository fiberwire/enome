"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const genome_1 = require("genotypes/genome");
const safe_mutate_1 = require("operators/mutation/safe-mutate");
const _ = require("lodash");
const replenish_1 = require("operators/replenish");
describe('operators/mutation', () => {
    describe('safeMutate', () => {
        let gen;
        let fitness;
        beforeEach(() => {
            gen = new genome_1.Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });
            fitness = (g) => {
                g = replenish_1.replenish(g);
                let ns = g.nuclei(10);
                return {
                    fitness: _.sum(ns),
                    genome: g
                };
            };
        });
        it('should return a mutated genome if it\'s better than the provided one, otherwise, should return the provided genome', () => {
            let mutant = safe_mutate_1.safeMutate(gen, fitness);
            chai_1.expect(mutant.sequence.length).to.equal(gen.sequence.length);
            chai_1.expect(fitness(mutant).fitness).to.be.at.least(fitness(gen).fitness);
            if (fitness(mutant).fitness > fitness(gen).fitness) {
                chai_1.expect(mutant.sequence).not.to.deep.equal(gen.sequence);
            }
            else {
                chai_1.expect(mutant.sequence).to.deep.equal(gen.sequence);
            }
        });
    });
});
//# sourceMappingURL=safe-mutate-test.js.map