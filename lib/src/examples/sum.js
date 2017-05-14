"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replenish_1 = require("../operators/replenish");
const index_1 = require("../index");
const _ = require("lodash");
let gOptions = {
    genomeLength: 100,
    nucleotideLength: 1,
    min: 1,
    max: 10000,
    length: 20
};
let pOptions = {
    populationSize: 10,
    mutateChance: 0.01,
    mutateType: 'sub'
};
function createlist(genome) {
    return _.range(0, genome.options.length)
        .map((i) => {
        let n = genome.nucleo;
        i = n.int(genome.options.min, genome.options.max);
        return genome.nucleo.int(genome.options.min, genome.options.max);
    });
}
function fitness(genome) {
    let target = 123456;
    let list = createlist(replenish_1.replenish(genome));
    let sum = _.sum(list);
    let absDifference = Math.abs(target - sum);
    //console.log(`target: ${target}, sum: ${sum}, absDiff: ${absDifference}, 1/absDiff: ${1/absDifference}`);
    return { fitness: 1 / absDifference, genome: genome, result: list };
}
let pop = new index_1.Population(pOptions, gOptions, createlist, fitness);
let ev = pop.evolve$(100)
    .subscribe(e => {
    let list = e.result;
    let f = e.fitness;
    console.log(`\tlist: ${list}, sum: ${_.sum(list)}, fitness: ${f}`);
}, err => console.log(err));
//# sourceMappingURL=sum.js.map