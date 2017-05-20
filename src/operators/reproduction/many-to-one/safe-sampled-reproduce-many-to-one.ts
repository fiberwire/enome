import * as _ from 'lodash';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    sampledReproduceManyToOne,
    top,
    value
} from '../../../index';

//produce one offspring, selected from a sample, from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
export function safeSampledReproduceManyToOne<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5
): Genome<T> {
    let offspring = sampledReproduceManyToOne(genomes, fitness, weights, sampleSize);
    let offspringFitness = fitness(offspring).fitness;
    let t = top(genomes, 0.5, fitness);
    let avgFitness = _.meanBy(t, e => e.fitness);

    if (offspringFitness > avgFitness) {
        return offspring;
    }
    else {
        return best(genomes, fitness).genome;
    }
}