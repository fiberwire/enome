import { FitnessObjective } from '../../enums/fitness-objective';
import * as _ from 'lodash';
import { avgFitness } from '../avg-fitness';
import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { MutateOp } from '../../enums/mutate-op';
import { sampledMutateMany } from './sampled-mutate-many';

export function safeSampledMutateMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    objective: FitnessObjective = FitnessObjective.maximize,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
    sampleSize: number = 5
): Genome<T>[] {
    let result: Genome<T>[] = [];

    switch (objective) {
        case FitnessObjective.maximize:
            while (result.length < genomes.length) {
                result = _.concat(
                    result,
                    sampledMutateMany(genomes, fitness, objective, mutateChance, mutateType, sampleSize)
                        .filter(g => fitness(g).fitness > avgFitness(genomes, fitness))
                )
            }

        case FitnessObjective.minimize:
            while (result.length < genomes.length) {
                result = _.concat(
                    result,
                    sampledMutateMany(genomes, fitness, objective, mutateChance, mutateType, sampleSize)
                        .filter(g => fitness(g).fitness < avgFitness(genomes, fitness))
                )
            }

    }

    return result.slice(0, genomes.length);
}