"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_type_1 = require("../enums/mutate-type");
const reproduce_type_1 = require("../enums/reproduce-type");
const fill_type_1 = require("../enums/fill-type");
const fitness_objective_1 = require("../enums/fitness-objective");
const mutate_op_1 = require("../enums/mutate-op");
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
    let target = 100;
    let list = createList(index_1.replenish(genome));
    let sum = _.sum(list);
    let fit = Math.abs(target - sum);
    return { fitness: fit, genome: genome, result: list };
}
let gOptions = {
    genomeLength: 3,
    nucleotideLength: 5,
    min: 1,
    max: 100,
    length: 3,
    extendNucleotides: true
};
let pOptions = {
    populationSize: 20,
    fillType: fill_type_1.FillType.none,
    fillPercent: 0.25,
    objective: fitness_objective_1.FitnessObjective.minimize,
    mutateOptions: {
        type: mutate_type_1.MutateType.safeSampled,
        sampleSize: 5,
        mutateChance: 0.15,
        mutateOp: mutate_op_1.MutateOp.sub
    },
    reproduceOptions: {
        type: reproduce_type_1.ReproduceType.normal,
        sampleSize: 5
    }
};
let pop = new index_1.NaturalSelection(pOptions, gOptions, createList, fitness);
let ev = pop.evolve$()
    .subscribe(e => {
    let list = e.result;
    let f = e.fitness;
    console.log(`\t`, `list: ${list}, sum: ${_.sum(list)}, fitness: ${f}`);
}, err => console.log(err));
//# sourceMappingURL=sum.js.map