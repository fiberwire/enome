import { FitnessObjective, GenomeRefill, IOrganismOptions, MutateOp, Simulation, UpdateType } from "../../index";
import { ISumGenomeOptions } from "./interfaces/sum-genome-options";
import { ISumOrganismOptions } from "./interfaces/sum-organism-options";
import { ISumPopOptions } from "./interfaces/sum-pop-options";
import { SumEnv } from "./sum-environment";
import { SumPopulation } from "./sum-population";

import * as _ from "lodash";
import * as Rx from "rxjs";

const genOptions: ISumGenomeOptions = {
    geneLength: 2,
    genomeLength: 10,
    length: 10,
    max: 5000,
    min: 1,
    refill: GenomeRefill.extend,
};

const popOptions: ISumPopOptions = {
    generations: 15000,
    mutate: {
        mutateChance: 0.05,
        mutateOp: MutateOp.sub,
    },
    objective: FitnessObjective.minimize,
    progress: true,
    size: 10,
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
    target: 14567,
};

const env = new SumEnv({
    interactionRate: 1000 ,
    updateType: UpdateType.assign,
});

const pop = new SumPopulation(
    genOptions,
    popOptions,
    orgOptions,
);

const sim = new Simulation(pop, env).start();

sim.best
    .subscribe((b) => {
        const list = b.phenotype;
        const fitness = b.fitness;
        const sum = _.sum(list);

        console.log(`New Best: list: ${list} sum: ${sum} fitness: ${fitness}`);
    });
