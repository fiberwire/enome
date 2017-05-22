"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    let mean = _.mean(list);
    let absDifference = Math.abs(target - mean);
    //console.log(`target: ${target}, sum: ${sum}, absDiff: ${absDifference}, 1/absDiff: ${1/absDifference}`);
    return { fitness: absDifference, genome: genome, result: list };
}
let gOptions = {
    genomeLength: 50,
    nucleotideLength: 1,
    min: 1,
    max: 10000,
    length: 15,
    extendNucleotides: false
};
let pOptions = {
    populationSize: 20,
    fillType: 'random',
    fillPercent: 0.15,
    mutateOptions: {
        safe: false,
        sampled: false,
        sampleSize: 5,
        mutateChance: 0.15,
        mutateType: 'sub' //either sub or avg
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