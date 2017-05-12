"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replenish_1 = require("operators/replenish");
const genome_1 = require("genotypes/genome");
const _ = require("lodash");
function mockGenome() {
    return new genome_1.Genome({ genomeLength: 100, nucleotideLength: 1 });
}
exports.mockGenome = mockGenome;
function mockGenomes() {
    return _.range(0, 10).map(i => mockGenome());
}
exports.mockGenomes = mockGenomes;
function mockFitness() {
    return (g) => {
        g = replenish_1.replenish(g);
        return {
            fitness: _.sum(g.nuclei(10).map(n => n.float(0, 0.1))),
            genome: g
        };
    };
}
exports.mockFitness = mockFitness;
function mockMutateChance() {
    return 0.5;
}
exports.mockMutateChance = mockMutateChance;
function mocks() {
    return {
        genome: mockGenome(),
        genomes: mockGenomes(),
        fitness: mockFitness(),
        mutateChance: mockMutateChance()
    };
}
exports.mocks = mocks;
//# sourceMappingURL=mocks.js.map