import { FillType } from '../enums/fill-type';
import { FitnessObjective } from '../enums/fitness-objective';
import { MutateType } from '../enums/mutate-type';
import * as _ from 'lodash';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    NaturalSelection,
    NaturalSelectionOptions,
    Nucleotide,
    replenish,
    sampledReproduce
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
    let sum = _.sum(list);
    let fit = Math.abs(target - sum);

    return { fitness: fit, genome: genome, result: list };
}

let gOptions: ListOptions = {
    genomeLength: 15,
    nucleotideLength: 1,
    min: 1,
    max: 100,
    length: 3,
    extendNucleotides: false
}

let pOptions: NaturalSelectionOptions = {
    populationSize: 20,
    fillType: FillType.worst, //either worst or random
    fillPercent: 0.15,
    objective: FitnessObjective.minimize,
    mutateOptions: {
        safe: true,
        sampled: false,
        sampleSize: 5,
        mutateChance: 0.15,
        mutateType: MutateType.avg //either sub or avg
    },
    reproduceOptions: {
        safe: true,
        sampled: false,
        sampleSize: 5
    }
};

let pop = new NaturalSelection(
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
