import * as _ from 'lodash';
import { avgFitness } from '../avg-fitness';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { MutateType } from '../../enums/mutate-type';
import { sampledMutateMany } from './sampled-mutate-many';

export function safeSampledMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    mutateChance: number = 0.05,
    mutateType: MutateType = MutateType.sub,
    sampleSize: number = 5
): Genome<T>[] {
    let result: Genome<T>[] = [];

    while (result.length < genomes.length) {
        result = _.concat(
            result,
            sampledMutateMany(genomes, fitness, mutateChance, mutateType, sampleSize)
                .filter(g => fitness(g).fitness > avgFitness(genomes, fitness))
        )
    }

    return result.slice(0, genomes.length);
}