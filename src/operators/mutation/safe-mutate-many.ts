import { MutateType } from '../../enums/mutate-type';
import * as _ from 'lodash';
import {
    avgFitness,
    Evaluation,
    Genome,
    GenomeOptions,
    mutateMany
    } from '../../index';

export function safeMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    mutateChance: number = 0.05,
    mutateType: MutateType = MutateType.sub
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