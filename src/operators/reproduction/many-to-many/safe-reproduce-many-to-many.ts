import * as _ from "lodash";
import { FitnessObjective } from "../../../enums/fitness-objective";
import { Genome } from "../../../genotypes/genome";
import { IEvaluation } from "../../../interfaces/evaluation";
import { IGenomeOptions } from "../../../options/genome-options";
import { avgFitness } from "../../avg-fitness";
import {bottom} from "../../bottom";
import { top } from "../../top";
import { value } from "../../value";
import { reproduceManyToMany } from "./reproduce-many-to-many";

export function safeReproduceManyToMany<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    n: number,
    fitness: (gen: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weights: number[] = _.range(genomes.length).map((i) => value()),
): Array<Genome<T>> {

    let result: Array<Genome<T>> = [];
    const avgFit = avgFitness(genomes, fitness);

    switch (objective) {
        case FitnessObjective.maximize:
            result = top(genomes, fitness).map((e) => e.genome);
            while (result.length < n) {
                result = _.concat(
                    result,
                    reproduceManyToMany(genomes, n, weights)
                        .filter((g) => fitness(g).fitness > avgFit),
                );
            }
            break;

        case FitnessObjective.minimize:
            result = bottom(genomes, fitness).map((e) => e.genome);
            while (result.length < n) {
                result = _.concat(
                    result,
                    reproduceManyToMany(genomes, n, weights)
                        .filter((g) => fitness(g).fitness < avgFit),
                );
            }
            break;
    }

    return result.slice(0, n);
}
