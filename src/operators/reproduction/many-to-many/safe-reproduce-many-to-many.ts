import * as _ from 'lodash';
import { avgFitness } from '../../avg-fitness';
import { Evaluation } from '../../../evaluation';
import { FitnessObjective } from '../../../enums/fitness-objective';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { reproduceManyToMany } from './reproduce-many-to-many';
import { value } from '../../value';

export function safeReproduceManyToMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
): Genome<T>[] {

    let result: Genome<T>[] = [];
    let avgFit = avgFitness(genomes, fitness);

    switch (objective) {
        case FitnessObjective.maximize:
            while (result.length < n) {
                result = _.concat(
                    result,
                    reproduceManyToMany(genomes, n, weights)
                        .filter(g => fitness(g).fitness > avgFit)
                )
            }
            break;

        case FitnessObjective.minimize:
            while (result.length < n) {
                result = _.concat(
                    result,
                    reproduceManyToMany(genomes, n, weights)
                        .filter(g => fitness(g).fitness < avgFit)
                )
            }
            break;
    }

    return result.slice(0, n);
}