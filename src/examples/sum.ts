import { replenish } from '../operators/replenish';

import { GenomeOptions, Genome, Evaluation, Nucleotide, Population, PopulationOptions } from "../index";
import * as _ from 'lodash';

import { fill } from "../operators/fill";
import { best } from "../operators/best";
import { top } from "../operators/top";


interface ListOptions extends GenomeOptions {
    min: number,
    max: number,
    length: number
}

let gOptions: ListOptions = {
    genomeLength: 100,
    nucleotideLength: 1,
    min: 1,
    max: 10000,
    length: 20
}

let pOptions: PopulationOptions = {
    populationSize: 10,
    mutateChance: 0.01,
    mutateType: 'sub'
};

function createlist(genome: Genome<ListOptions>): number[] {
    return _.range(0, genome.options.length)
        .map((i: number) => {
            let n: Nucleotide = genome.nucleo;
            i = n.int(genome.options.min, genome.options.max);
            return genome.nucleo.int(genome.options.min, genome.options.max);
        });
}

function fitness(genome: Genome<ListOptions>): Evaluation<ListOptions, number[]> {
    let target = 123456;

    let list = createlist(replenish(genome));
    let sum = _.sum(list);
    let absDifference = Math.abs(target - sum);
    //console.log(`target: ${target}, sum: ${sum}, absDiff: ${absDifference}, 1/absDiff: ${1/absDifference}`);

    return { fitness: 1 / absDifference, genome: genome, result: list };
}

let pop = new Population(
    pOptions,
    gOptions,
    createlist,
    fitness
);

let ev = pop.evolve$(100)
    .subscribe(e => {
        let list = e.result;
        let f = e.fitness;
        console.log(`\tlist: ${list}, sum: ${_.sum(list)}, fitness: ${f}`);
    },
    err => console.log(err))


