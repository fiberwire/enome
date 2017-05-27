import * as _ from "lodash";
import { FitnessObjective } from "../../../enums/fitness-objective";
import {
    best,
    Genome,
    IEvaluation,
    IGenomeOptions,
    reproduceManyToOne,
    value,
} from "../../../index";
import { worst } from "../../worst";

// produce one offspring from many provided genomes, each one selected from a sample
export function sampledReproduceManyToOne<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weights: number[] = _.range(0, genomes.length).map((i) => value()),
    sampleSize: number = 5,
): Genome<T> {
    // produce offspring
    const offspring = _.range(0, sampleSize)
        .map((i) => {
            return reproduceManyToOne(genomes, weights);
        });

    // return best genome
    switch (objective) {
        case FitnessObjective.maximize:
            return best(offspring, fitness).genome;

        case FitnessObjective.minimize:
            return worst(offspring, fitness).genome;
    }

}
