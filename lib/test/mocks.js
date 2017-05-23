"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fill_type_1 = require("../src/enums/fill-type");
const fitness_objective_1 = require("../src/enums/fitness-objective");
const mutate_type_1 = require("../src/enums/mutate-type");
const artificial_selection_1 = require("../src/populations/artificial-selection");
const _ = require("lodash");
const genome_1 = require("../src/genotypes/genome");
const natural_selection_1 = require("../src/populations/natural-selection");
const replenish_1 = require("../src/operators/replenish");
const value_1 = require("../src/operators/value");
function mockGenome() {
    return new genome_1.Genome({
        genomeLength: 50,
        nucleotideLength: 1,
        extendNucleotides: false
    });
}
exports.mockGenome = mockGenome;
function mockGenomes() {
    return _.range(0, 10).map(i => mockGenome());
}
exports.mockGenomes = mockGenomes;
function mockNSCreate(genome) {
    return genome.nuclei(10).map((n) => n.float(0, 0.1));
}
exports.mockNSCreate = mockNSCreate;
function mockASCreate(genome) {
    return genome.nuclei(10).map((n) => n.letter());
}
exports.mockASCreate = mockASCreate;
function mockNSFitness(gen) {
    let list = mockNSCreate(replenish_1.replenish(gen));
    return {
        fitness: _.sum(list),
        genome: gen,
        result: list
    };
}
exports.mockNSFitness = mockNSFitness;
function mockMutateChance() {
    return 0.5;
}
exports.mockMutateChance = mockMutateChance;
function mockWeights() {
    return _.range(0, 10).map(i => value_1.value());
}
exports.mockWeights = mockWeights;
function mockNSOptions() {
    return {
        populationSize: 20,
        fillType: fill_type_1.FillType.random,
        fillPercent: 0.15,
        objective: fitness_objective_1.FitnessObjective.minimize,
        mutateOptions: {
            safe: false,
            sampled: false,
            sampleSize: 5,
            mutateChance: 0.15,
            mutateType: mutate_type_1.MutateType.sub //either sub or avg
        },
        reproduceOptions: {
            safe: true,
            sampled: false,
            sampleSize: 5
        }
    };
}
exports.mockNSOptions = mockNSOptions;
function mockASOptions() {
    return {
        initSize: 10,
        minSize: 5,
        maxSixe: 15,
        mutateOptions: {
            safe: false,
            sampled: false,
            sampleSize: 5,
            mutateChance: 0.15,
            mutateType: mutate_type_1.MutateType.avg //either sub or avg
        },
    };
}
exports.mockASOptions = mockASOptions;
function mockGenomeOptions() {
    return {
        genomeLength: 50,
        nucleotideLength: 1,
        extendNucleotides: false
    };
}
exports.mockGenomeOptions = mockGenomeOptions;
function mockNS() {
    return new natural_selection_1.NaturalSelection(mockNSOptions(), mockGenomeOptions(), mockNSCreate, mockNSFitness);
}
exports.mockNS = mockNS;
function mockAS() {
    return new artificial_selection_1.ArtificialSelection(mockASOptions(), mockGenomeOptions(), mockASCreate);
}
exports.mockAS = mockAS;
function mocks() {
    return {
        genome: mockGenome(),
        genomes: mockGenomes(),
        nsFitness: mockNSFitness,
        mutateChance: mockMutateChance(),
        weights: mockWeights(),
        natural: mockNS(),
        nsCreate: mockNSCreate,
        naturalOptions: mockNSOptions(),
        genomeOptions: mockGenomeOptions(),
        artificial: mockAS(),
        asCreate: mockASCreate
    };
}
exports.mocks = mocks;
//# sourceMappingURL=mocks.js.map