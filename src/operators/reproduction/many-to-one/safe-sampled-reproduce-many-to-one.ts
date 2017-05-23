import * as _ from 'lodash';
import { avgFitness } from '../../avg-fitness';
import { best } from '../../best';
import { bottom } from '../../bottom';
import { Evaluation } from '../../../interfaces/evaluation';
import { FitnessObjective } from '../../../enums/fitness-objective';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { sampledReproduceManyToOne } from './sampled-reproduce-many-to-one';
import { top } from '../../top';
import { value } from '../../value';
import { worst } from '../../worst';

//produce one offspring, selected from a sample, from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
export function safeSampledReproduceManyToOne<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5
): Genome<T> {
    let offspring = sampledReproduceManyToOne(genomes, fitness, objective, weights, sampleSize);
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