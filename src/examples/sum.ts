import * as _ from "lodash";
import { FillType } from "../enums/fill-type";
import { FitnessObjective } from "../enums/fitness-objective";
import { MutateOp } from "../enums/mutate-op";
import { MutateType } from "../enums/mutate-type";
import { ReproduceType } from "../enums/reproduce-type";
import {
    best,
    Gene,
    Genome,
    IEvaluation,
    IGenomeOptions,
    NaturalSelection,
    NaturalSelectionOptions,
    replenish,
    sampledReproduce,
} from "../index";

interface IListOptions extends IGenomeOptions {
    min: number;
    max: number;
    length: number;
}

function createList(genome: Genome<IListOptions>): number[] {
    return _.range(genome.options.length)
        .map((i: number) => genome.g.int(genome.options.min, genome.options.max));
}

function fitness(genome: Genome<IListOptions>): IEvaluation<IListOptions, number[]> {
    const target = 100;

    const list = createList(replenish(genome));
    const sum = _.sum(list);
    const fit = Math.abs(target - sum);

    return { fitness: fit, genome, phenotype: list };
}

const gOptions: IListOptions = {
    geneLength: 5,
    genomeLength: 3,
    length: 3,
    loopGenes: true,
    max: 100,
    min: 1,
};

const pOptions: NaturalSelectionOptions = {
    fillPercent: 0.25,
    fillType: FillType.none,
    mutateOptions: {
        mutateChance: 0.15,
        mutateOp: MutateOp.sub,
        sampleSize: 5,
        type: MutateType.safeSampled,
    },
    objective: FitnessObjective.minimize,
    populationSize: 20,
    reproduceOptions: {
        sampleSize: 5,
        type: ReproduceType.normal,
    },
};

const pop = new NaturalSelection(
    pOptions,
    gOptions,
    createList,
    fitness,
);

const ev = pop.evolve$()
    .subscribe((e: IEvaluation<IListOptions, number[]>) => {
        const list = e.phenotype;
        const f = e.fitness;
        // do something with list
    });
