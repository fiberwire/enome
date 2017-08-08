import { FitnessObjective, GenomeRefill, IOrganismOptions, MutateOp, Simulation } from "../../index";
import { SumEnv } from "./sum-environment";
import { ISumGenomeOptions } from "./sum-genome-options";
import { ISumOrganismOptions } from "./sum-organism-options";
import { ISumPopOptions } from "./sum-pop-options";
import { SumPopulation } from "./sum-population";

import * as _ from "lodash";

const genOptions: ISumGenomeOptions = {
    geneLength: 2,
    genomeLength: 100,
    length: 100,
    max: 500,
    min: 1,
    refill: GenomeRefill.extend,
};

const popOptions: ISumPopOptions = {
    generations: 20000,
    mutate: {
        mutateChance: 0.15,
        mutateOp: MutateOp.sub,
    },
    objective: FitnessObjective.minimize,
    progress: true,
    size: 100,
    topPercent: .25,
    weights: {
        keep: 5,
        mutate: 15,
        randomize: 10,
        reproduce: 70,
    },
};

const orgOptions: ISumOrganismOptions = {
    interactions: 1,
    target: 4567,
};

const env = new SumEnv({ interactionRate: 1 });

const pop = new SumPopulation(
    genOptions,
    popOptions,
    orgOptions,
);

const sim = new Simulation(pop, env).start();

sim.best
    .filter((b) => b !== undefined && b != null)
    .subscribe((b) => {
        const list = b.phenotype;
        const fitness = b.fitness;
        const sum = _.sum(list);

        console.log(`New Best: list: ${list} sum: ${sum} fitness: ${fitness}`);
    });
