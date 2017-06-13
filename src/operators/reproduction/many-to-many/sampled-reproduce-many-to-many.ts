import * as _ from "lodash";
import { FitnessObjective } from "../../../enums/fitness-objective";
import {
    best,
    bottom,
    Genome,
    IEvaluation,
    IGenomeOptions,
    reproduceManyToOne,
    top,
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

    let result: Array<Genome<T>>;

    switch (objective) {
        case FitnessObjective.maximize:
            result = top(genomes, fitness).map((e) => e.genome);
            while (result.length < n) {
                const sample = _.range(sampleSize)
                    .map((j) => reproduceManyToOne(genomes, weights));

                result = _.concat(result, best(sample, fitness).genome);
            }
            break;
        case FitnessObjective.minimize:
            result = bottom(genomes, fitness).map((e) => e.genome);
            while (result.length < n) {
                const sample = _.range(sampleSize)
                    .map((j) => reproduceManyToOne(genomes, weights));

                result = _.concat(result, best(sample, fitness).genome);
            }
            break;
    }

    return result;
}
