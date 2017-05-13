"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replenish_1 = require("operators/replenish");
const genome_1 = require("genotypes/genome");
const _ = require("lodash");
const value_1 = require("operators/value");
function mockGenome() {
    return new genome_1.Genome({ genomeLength: 50, nucleotideLength: 1 });
}
exports.mockGenome = mockGenome;
function mockGenomes() {
    return _.range(0, 10).map(i => mockGenome());
}
exports.mockGenomes = mockGenomes;
function mockFitness() {
    return (gen) => {
        let g = replenish_1.replenish(gen);
        return {
            fitness: _.sum(g.nuclei(10).map(n => n.float(0, 0.1))),
            genome: gen
        };
    };
}
exports.mockFitness = mockFitness;
function mockMutateChance() {
    return 0.5;
}
exports.mockMutateChance = mockMutateChance;
function mockWeights() {
    return _.range(0, 10).map(i => value_1.value());
}
exports.mockWeights = mockWeights;
function mocks() {
    return {
        genome: mockGenome(),
        genomes: mockGenomes(),
        fitness: mockFitness(),
        mutateChance: mockMutateChance(),
        weights: mockWeights()
    };
}
exports.mocks = mocks;
//# sourceMappingURL=mocks.js.map