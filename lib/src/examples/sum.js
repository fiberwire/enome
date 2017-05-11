"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const _ = require("lodash");
const fill_1 = require("../operators/fill");
const best_1 = require("../operators/best");
const top_1 = require("../operators/top");
let options = {
    genomeLength: 300,
    nucleotideLength: 1,
    min: 1,
    max: 100,
    length: 3
};
function createlist(gen) {
    return _.range(0, gen.options.length)
        .map((i) => {
        let n = gen.nucleo;
        //console.log(`n: ${n}`);
        i = n.int(gen.options.min, gen.options.max);
        return gen.nucleo.int(gen.options.min, gen.options.max);
    });
}
function fitness(genome) {
    let target = 256;
    let list = createlist(genome);
    let sum = _.sum(list);
    let absDifference = Math.abs(target - sum);
    //console.log(`target: ${target}, sum: ${sum}, absDiff: ${absDifference}, 1/absDiff: ${1/absDifference}`);
    return { fitness: 1 / absDifference, genome: genome };
}
let genomes = _.range(0, 100).map(i => new index_1.Genome(options));
function evolve(gens, fitness) {
    let t = top_1.top(gens, 0.75, fitness).map(e => e.genome);
    let f = fill_1.fill(t, 100);
    return f;
}
let generation = 0;
while (best_1.best(genomes, fitness).fitness < .9999) {
    generation++;
    genomes = evolve(genomes, fitness);
    let bst = best_1.best(genomes, fitness);
    let gen = bst.genome;
    let sum = _.sum(createlist(gen));
    let fit = bst.fitness;
    console.log(`generation: ${generation} sum: ${sum} fitness: ${fit}`);
}
//# sourceMappingURL=sum.js.map