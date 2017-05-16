import * as _ from 'lodash';
import { avgFitness } from '../../avg-fitness';
import { Evaluation } from '../../../evaluation';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { sampledReproduceManyToMany } from './sampled-reproduce-many-to-many';
import { value } from '../../value';

//produces many offspring from many genomes, each group selected from a sample, then returns the best group of offspring
export function safeSampledReproduceManyToMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    sampleSize: number = 5,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
): Genome<T>[] {
    let result: Genome<T>[] = [];
    let avgFit = avgFitness(genomes, fitness);

    while (result.length < n) {
        result = _.concat(
            result,
            sampledReproduceManyToMany(genomes, n, fitness, sampleSize, weights)
                .filter(g => fitness(g).fitness > avgFit)
        )
    }

    return result.slice(0, n);
}