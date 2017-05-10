"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const _ = require("lodash");
const index_2 = require("../operators/index");
const fill_1 = require("../operators/fill");
const best_1 = require("../operators/best");
let options = {
    genomeLength: 30,
    nucleotideLength: 1,
    min: 1,
    max: 100,
    length: 3
};
function createlist(gen) {
    return _.range(0, gen.options.length)
        .map(i => {
        let n = gen.nucleo;
        i = n.int(gen.options.min, gen.options.max);
        return gen.nucleo.int(gen.options.min, gen.options.max);
    });
}
function fitness(genome) {
    let target = 256;
    let list = createlist(genome);
    let sum = _.sum(list);
    let absDifference = Math.abs(target - sum);
    return { fitness: 1 / absDifference, genome: genome };
}
let genomes = _.range(0, 100).map(i => new index_1.Genome(options));
function evolve(gens, fitness) {
    gens = index_2.top(gens, 0.5, fitness).map(e => e.genome);
    gens = fill_1.fill(gens, 100);
    return gens;
}
while (best_1.best(genomes, fitness).fitness < 1) {
    genomes = evolve(genomes, fitness);
    let bst = best_1.best(genomes, fitness);
    let gen = bst.genome;
    let sum = _.sum(createlist(gen));
    let fit = bst.fitness;
    //console.log(`sum: ${sum} fitness: ${fit}`);
}
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/examples/sum.js.map