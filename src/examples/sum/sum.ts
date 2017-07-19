import { FitnessObjective, GenomeRefill, IOrganismOptions, MutateOp } from "../../index";
import { SumEnv } from "./sum-environment";
import { ISumGenomeOptions } from "./sum-genome-options";
import { ISumPopOptions } from "./sum-pop-options";
import { SumPopulation } from "./sum-population";

import * as _ from "lodash";

const genOptions: ISumGenomeOptions = {
    geneLength: 1,
    genomeLength: 50,
    length: 7,
    max: 100,
    min: 1,
    refill: GenomeRefill.extend,
};

const popOptions: ISumPopOptions = {
    generations: 100000,
    mutate: {
        mutateChance: 0.01,
        mutateOp: MutateOp.sub,
    },
    objective: FitnessObjective.minimize,
    progress: true,
    size: 10,
    target: 150,
    topPercent: .25,
    weights: {
        mutate: 15,
        randomize: 10,
        reproduce: 75,
    },
};

const orgOptions: IOrganismOptions = {
    interactions: 1,
    lifeSpan: 10,
};

const envs = _.range(popOptions.size)
    .map((i) => new SumEnv({ interactionRate: 100 })) ;

const pop = new SumPopulation(
    genOptions,
    popOptions,
    orgOptions,
    ...envs,
);

pop.best
    .filter((b) => b !== undefined && b !== null)
    .filter((b) => b.organism.data.value != null)
    .filter((b) => b.organism.data.value.length > 0)
    .subscribe((b) => {
        const list = b.organism.phenotype;
        const sum = b.organism.data.value[0].sum;
        const fit = b.fitness;
    });
