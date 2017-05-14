"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const genome_1 = require("../src/genotypes/genome");
const replenish_1 = require("../src/operators/replenish");
const value_1 = require("../src/operators/value");
function mockGenome() {
    return new genome_1.Genome({ genomeLength: 50, nucleotideLength: 1 });
}
exports.mockGenome = mockGenome;
function mockGenomes() {
    return _.range(0, 10).map(i => mockGenome());
}
exports.mockGenomes = mockGenomes;
function MockCreate(genome) {
    return genome.nuclei(10).map((n) => n.float(0, 0.1));
}
exports.MockCreate = MockCreate;
function mockFitness() {
    return (gen) => {
        let list = MockCreate(replenish_1.replenish(gen));
        return {
            fitness: _.sum(list),
            genome: gen,
            result: list
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