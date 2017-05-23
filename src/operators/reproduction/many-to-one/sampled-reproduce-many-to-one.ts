import * as _ from 'lodash';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    reproduceManyToOne,
    value
} from '../../../index';
import { FitnessObjective } from '../../../enums/fitness-objective';
import { worst } from '../../worst';

//produce one offspring from many provided genomes, each one selected from a sample
export function sampledReproduceManyToOne<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5
): Genome<T> {
    //produce offspring
    let offspring = _.range(0, sampleSize)
        .map(i => {
            return reproduceManyToOne(genomes, weights);
        })
    
    //return best genome
    switch (objective) {
        case FitnessObjective.maximize:
            return best(offspring, fitness).genome;

        case FitnessObjective.minimize:
            return worst(offspring, fitness).genome;
    }

}