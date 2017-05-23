import { bottom } from '../../bottom';
import * as _ from 'lodash';
import { avgFitness } from '../../avg-fitness';
import { best } from '../../best';
import { Evaluation } from '../../../evaluation';
import { FitnessObjective } from '../../../enums/fitness-objective';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { reproduceManyToOne } from './reproduce-many-to-one';
import { top } from '../../top';
import { value } from '../../value';
import { worst } from '../../worst';

//produce one offspring from many provided genomes, then returns the offspring if it is better than the top 50% on average, otherwise returns the best genome
export function safeReproduceManyToOne<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
): Genome<T> {
    let offspring = reproduceManyToOne(genomes, weights);
    let offspringFitness = fitness(offspring).fitness;

    let t = top(genomes, fitness, 0.5);
    let b = bottom(genomes, fitness, 0.5);

    let topAvgFitness = _.meanBy(t, e => e.fitness);
    let botAvgFitness = _.meanBy(b, e => e.fitness);

    switch (objective) {
        case FitnessObjective.maximize:
            if (offspringFitness > topAvgFitness) {
                return offspring;
            }
            else {
                return best(genomes, fitness).genome;
            }
        case FitnessObjective.minimize:
            if (offspringFitness < botAvgFitness) {
                return offspring;
            }
            else {
                return worst(genomes, fitness).genome;
            }
    }
}