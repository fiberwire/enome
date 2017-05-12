
import { GenomeOptions, Genome, Evaluation, Nucleotide } from "../index";
import * as _ from 'lodash';

import { fill } from "../operators/fill";
import { best } from "../operators/best";
import { top } from "../operators/top";

interface ListOptions extends GenomeOptions {
    min: number,
    max: number,
    length: number
}

let options: ListOptions = {
    genomeLength: 300,
    nucleotideLength: 1,
    min: 1,
    max: 100,
    length: 3
}

function createlist(gen: Genome<ListOptions>): number[] {
    return _.range(0, gen.options.length)
        .map((i: number) => {

            let n: Nucleotide = gen.nucleo;
            //console.log(`n: ${n}`);
            i = n.int(gen.options.min, gen.options.max);
            return gen.nucleo.int(gen.options.min, gen.options.max);
        });
}

function fitness(genome: Genome<ListOptions>): Evaluation<ListOptions> {
    let target = 256;
    let list = createlist(genome);
    let sum = _.sum(list);
    let absDifference = Math.abs(target - sum);
    //console.log(`target: ${target}, sum: ${sum}, absDiff: ${absDifference}, 1/absDiff: ${1/absDifference}`);

    return { fitness: 1 / absDifference, genome: genome };
}

let genomes = _.range(0, 100).map(i => new Genome(options))



function evolve(gens: Genome<ListOptions>[], fitness: (genome: Genome<ListOptions>) => Evaluation<ListOptions>): Genome<ListOptions>[] {
    let t = top(gens, 0.75, fitness).map(e => e.genome);
    let f = fill(t, 100);
    return f;
}

let generation = 0;
while (best(genomes, fitness).fitness < .9999) {
    generation++;
    genomes = evolve(genomes, fitness);
    let bst = best(genomes, fitness);
    let gen = bst.genome;
    let sum = _.sum(createlist(gen));
    let fit = bst.fitness;
    console.log(`generation: ${generation} sum: ${sum} fitness: ${fit}`);
}

