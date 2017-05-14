import * as _ from 'lodash';
import { avgFitness } from '../../avg-fitness';
import { Evaluation } from '../../../evaluation';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { reproduceManyToMany } from './reproduce-many-to-many';
import { value } from '../../value';

export function safeReproduceManyToMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
): Genome<T>[] {

    let result: Genome<T>[] = [];
    let avgFit = avgFitness(genomes, fitness);

    while (result.length < n) {
        result = _.concat(
            result,
            reproduceManyToMany(genomes, n, weights)
                .filter(g => fitness(g).fitness > avgFit)
        )
    }

    return result.slice(0, n);
}