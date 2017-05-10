
import { EnomeOptions, Genome, Evaluation, Nucleotide } from "../index";
import * as _ from 'lodash';
import { top } from "../operators/index";
import { fill } from "../operators/fill";
import { best } from "../operators/best";

interface ListOptions extends EnomeOptions {
    min: number,
    max: number,
    length: number
}

let options: ListOptions = {
    genomeLength: 30,
    nucleotideLength: 1,
    min: 1,
    max: 100,
    length: 3
}

function createlist(gen: Genome<ListOptions>): number[] {
    return _.range(0, gen.options.length)
        .map(i => {

            let n = gen.nucleo;
            i = n.int(gen.options.min, gen.options.max);
            return gen.nucleo.int(gen.options.min, gen.options.max);
        });
}

function fitness(genome: Genome<ListOptions>): Evaluation<ListOptions> {
    let target = 256;
    let list = createlist(genome);
    let sum = _.sum(list);
    let absDifference = Math.abs(target - sum);

    return { fitness: 1 / absDifference, genome: genome };
}

let genomes = _.range(0, 100).map(i => new Genome(options))



function evolve(gens: Genome<ListOptions>[], fitness: (genome: Genome<ListOptions>) => Evaluation<ListOptions>): Genome<ListOptions>[] {
        gens = top(gens, 0.5, fitness).map(e => e.genome);
        gens = fill(gens, 100);
        return gens;
}

while (best(genomes, fitness).fitness < 1){
    genomes = evolve(genomes, fitness);
    let bst = best(genomes, fitness);
    let gen = bst.genome;
    let sum = _.sum(createlist(gen));
    let fit = bst.fitness; 
    //console.log(`sum: ${sum} fitness: ${fit}`);
}

