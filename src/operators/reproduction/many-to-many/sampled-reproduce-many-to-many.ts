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

//produces many offspring from many genomes, each one selected from a sample
export function sampledReproduceManyToMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    sampleSize: number = 5,
    weights: number[] = _.range(0, genomes.length).map(i => value())
): Genome<T>[] {
    //create many genomes (according to n)
    return _.range(0, n)
        .map(i => {
            //create sample of genomes (according to sampleSize)
            let sample = _.range(0, sampleSize)
                .map(i => reproduceManyToOne(genomes, weights))

            //return best genome from sample
            switch (objective) {
                case FitnessObjective.maximize:
                    return best(sample, fitness).genome;

                case FitnessObjective.minimize:
                    return worst(sample, fitness).genome;

                default:
                    return best(sample, fitness).genome;
            }
        })
}