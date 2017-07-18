import { FitnessObjective, GenomeRefill, IOrganismOptions, MutateOp } from "../../index";
import { SumEnv } from "./sum-environment";
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
    mutate: {
        mutateChance: 0.15,
        mutateOp: MutateOp.avg,
    },
    objective: FitnessObjective.minimize,
    size: 10,
    target: 256,
    weights: {
        mutate: 65,
        randomize: 10,
        reproduce: 25,
    },
};

const orgOptions: IOrganismOptions = {
    interactions: 1,
    lifeSpan: 10,
};

const env = new SumEnv({ interactionRate: 10 });

const pop = new SumPopulation(
    genOptions,
    popOptions,
    orgOptions,
    env,
);

pop.best
    .filter((b) => b !== undefined && b !== null)
    .filter((b) => b.organism.data.value != null)
    .filter((b) => b.organism.data.value.length > 0)
    .subscribe((b) => {
        const list = b.organism.phenotype;
        const sum = b.organism.data.value[0].sum;
        const fit = b.fitness;

        // tslint:disable-next-line:no-console
        console.log(`List: ${list}, Sum: ${sum}, Fitness: ${fit}`);
    });
