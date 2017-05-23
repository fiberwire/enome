"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fill_type_1 = require("../enums/fill-type");
const fitness_objective_1 = require("../enums/fitness-objective");
const mutate_type_1 = require("../enums/mutate-type");
const _ = require("lodash");
const index_1 = require("../index");
function createList(genome) {
    return _.range(0, genome.options.length)
        .map((i) => {
        let n = genome.nucleo;
        i = n.int(genome.options.min, genome.options.max);
        return genome.nucleo.int(genome.options.min, genome.options.max);
    });
}
function fitness(genome) {
    let target = 1234;
    let list = createList(index_1.replenish(genome));
    let sum = _.sum(list);
    let fit = Math.abs(target - sum);
    return { fitness: fit, genome: genome, result: list };
}
let gOptions = {
    genomeLength: 15,
    nucleotideLength: 1,
    min: 1,
    max: 100,
    length: 3,
    extendNucleotides: false
};
let pOptions = {
    populationSize: 20,
    fillType: fill_type_1.FillType.worst,
    fillPercent: 0.15,
    objective: fitness_objective_1.FitnessObjective.minimize,
    mutateOptions: {
        safe: true,
        sampled: false,
        sampleSize: 5,
        mutateChance: 0.15,
        mutateType: mutate_type_1.MutateType.avg //either sub or avg
    },
    reproduceOptions: {
        safe: true,
        sampled: false,
        sampleSize: 5
    }
};
let pop = new index_1.NaturalSelection(pOptions, gOptions, createList, fitness);
let ev = pop.evolve$(1000)
    .subscribe(e => {
    let list = e.result;
    let f = e.fitness;
    console.log(`\t`, `list: ${list}, mean: ${_.mean(list)}, fitness: ${f}`);
}, err => console.log(err));
//# sourceMappingURL=sum.js.map