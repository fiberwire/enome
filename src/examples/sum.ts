import { MutateType } from '../enums/mutate-type';
import { ReproduceType } from '../enums/reproduce-type';
import { FillType } from '../enums/fill-type';
import { FitnessObjective } from '../enums/fitness-objective';
import { MutateOp } from '../enums/mutate-op';
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
    let target = 100;

    let list = createList(replenish(genome));
    let sum = _.sum(list);
    let fit = Math.abs(target - sum);

    return { fitness: fit, genome: genome, result: list };
}

let gOptions: ListOptions = {
    genomeLength: 3,
    nucleotideLength: 5,
    min: 1,
    max: 100,
    length: 3,
    extendNucleotides: true
}

let pOptions: NaturalSelectionOptions = {
    populationSize: 20,
    fillType: FillType.none,
    fillPercent: 0.25,
    objective: FitnessObjective.minimize,
    mutateOptions: {
        type: MutateType.safeSampled,
        sampleSize: 5,
        mutateChance: 0.15,
        mutateOp: MutateOp.sub
    },
    reproduceOptions: {
        type: ReproduceType.normal,
        sampleSize: 5
    }
};

let pop = new NaturalSelection(
    pOptions,
    gOptions,
    createList,
    fitness
);


let ev = pop.evolve$()
    .subscribe(e => {
        let list = e.result;
        let f = e.fitness;
        console.log(`\t`, `list: ${list}, sum: ${_.sum(list)}, fitness: ${f}`);
    },
    err => console.log(err))
