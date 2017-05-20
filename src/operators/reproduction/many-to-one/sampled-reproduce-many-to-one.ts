import * as _ from 'lodash';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    reproduceManyToOne,
    value
} from '../../../index';

//produce one offspring from many provided genomes, each one selected from a sample
export function sampledReproduceManyToOne<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5
): Genome<T> {
    //produce offspring
    let offspring = _.range(0, sampleSize)
        .map(i => {
            return reproduceManyToOne(genomes, weights);
        })

    return best(offspring, fitness).genome;
}