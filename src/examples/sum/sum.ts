import { FitnessObjective, GenomeRefill, MutateOp } from "../../index";
import { ISumGenomeOptions } from "./sum-genome-options";
import { ISumPopOptions } from "./sum-pop-options";
import { SumPopulation } from "./sum-population";

import * as _ from "lodash";

const genOptions: ISumGenomeOptions = {
    geneLength: 1,
    genomeLength: 10,
    length: 5,
    max: 100,
    min: 1,
    refill: GenomeRefill.extend,
};

const popOptions: ISumPopOptions = {
    envs: 10,
    mutate: {
        mutateChance: 0.15,
        mutateOp: MutateOp.avg,
    },
    objective: FitnessObjective.minimize,
    size: 1,
    target: 256,
    weights: {
        mutate: 65,
        randomize: 10,
        reproduce: 25,
    },
};

const pop = new SumPopulation(
    genOptions,
    popOptions,
);

pop.best.subscribe((b) => {
    const list = b.organism.phenotype.value;
    const sum = _.sum(list);
    const fit = b.fitness;

    // tslint:disable-next-line:no-console
    console.log(`List: ${list}, Sum: ${sum}, Fitness: ${fit}`);
});
