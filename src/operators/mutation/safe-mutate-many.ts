import * as _ from 'lodash';
import { avgFitness } from '../avg-fitness';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { mutateMany } from './mutate-many';

export function safeMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    mutateChance: number = 0.05,
    mutateType: string = 'sub'
): Genome<T>[] {
    let result: Genome<T>[] = [];

    while (result.length < genomes.length) {
        result = _.concat(
            result,
            mutateMany(genomes, mutateChance, mutateType)
                .filter(g => fitness(g).fitness > avgFitness(genomes, fitness))
        )
    }

    return result.slice(0, genomes.length);
}