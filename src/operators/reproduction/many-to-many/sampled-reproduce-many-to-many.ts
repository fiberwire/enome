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

// produces many offspring from many genomes, each one selected from a sample
export function sampledReproduceManyToMany<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    n: number,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    weights: number[] = _.range(0, genomes.length).map((i) => value()),
): Array<Genome<T>> {
    // create many genomes (according to n)
    return _.range(0, n)
        .map((i) => {
            // create sample of genomes (according to sampleSize)
            const sample = _.range(0, sampleSize)
                .map((j) => reproduceManyToOne(genomes, weights));

            // return best genome from sample
            switch (objective) {
                case FitnessObjective.maximize:
                    return best(sample, fitness).genome;

                case FitnessObjective.minimize:
                    return worst(sample, fitness).genome;

                default:
                    return best(sample, fitness).genome;
            }
        });
}
