import * as _ from 'lodash';
import {
    sampledReproduce,
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    Nucleotide,
    Population,
    PopulationOptions,
    replenish
} from '../index';

interface ListOptions extends GenomeOptions {
    min: number,
    max: number,
    length: number
}

function createList(genome: Genome<ListOptions>): number[] {
    return _.range(0, genome.options.length)
        .map((i: number) => {
            let n: Nucleotide = genome.nucleo;
            i = n.int(genome.options.min, genome.options.max);
            return genome.nucleo.int(genome.options.min, genome.options.max);
        });
}

function fitness(genome: Genome<ListOptions>): Evaluation<ListOptions, number[]> {
    let target = 1234;

    let list = createList(replenish(genome));
    let mean = _.mean(list);
    let absDifference = Math.abs(target - mean);
    //console.log(`target: ${target}, sum: ${sum}, absDiff: ${absDifference}, 1/absDiff: ${1/absDifference}`);
    
    return { fitness: absDifference, genome: genome, result: list };
}

let gOptions: ListOptions = {
    genomeLength: 50,
    nucleotideLength: 1,
    min: 1,
    max: 10000,
    length: 15,
    extendNucleotides: false
}

let pOptions: PopulationOptions = {
    populationSize: 20,
    fillType: 'random', //either worst or random
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

let pop = new Population(
    pOptions,
    gOptions,
    createList,
    fitness
);


let ev = pop.evolve$(1000)
    .subscribe(e => {
        let list = e.result;
        let f = e.fitness;
        console.log(`\t`, `list: ${list}, mean: ${_.mean(list)}, fitness: ${f}`);
    },
    err => console.log(err))
