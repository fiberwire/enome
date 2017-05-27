import * as _ from "lodash";
import { FitnessObjective } from "../../../enums/fitness-objective";
import { Genome } from "../../../genotypes/genome";
import { IEvaluation } from "../../../interfaces/evaluation";
import { IGenomeOptions } from "../../../options/genome-options";
import { avgFitness } from "../../avg-fitness";
import { best } from "../../best";
import { bottom } from "../../bottom";
import { top } from "../../top";
import { value } from "../../value";
import { worst } from "../../worst";
import { reproduceManyToOne } from "./reproduce-many-to-one";

// produce one offspring from many provided genomes,
// then returns the offspring if it is better than the top 50% on average, otherwise returns the best genome
export function safeReproduceManyToOne<T extends IGenomeOptions, U>(
    genomes: Array<Genome<T>>,
    fitness: (genome: Genome<T>) => IEvaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weights: number[] = _.range(0, genomes.length).map((i) => value()),
): Genome<T> {
    const offspring = reproduceManyToOne(genomes, weights);
    const offspringFitness = fitness(offspring).fitness;

    const t = top(genomes, fitness, 0.5);
    const b = bottom(genomes, fitness, 0.5);

    const topAvgFitness = _.meanBy(t, (e) => e.fitness);
    const botAvgFitness = _.meanBy(b, (e) => e.fitness);

    switch (objective) {
        case FitnessObjective.maximize:
            if (offspringFitness > topAvgFitness) {
                return offspring;
            } else {
                return best(genomes, fitness).genome;
            }
        case FitnessObjective.minimize:
            if (offspringFitness < botAvgFitness) {
                return offspring;
            } else {
                return worst(genomes, fitness).genome;
            }
    }
}
