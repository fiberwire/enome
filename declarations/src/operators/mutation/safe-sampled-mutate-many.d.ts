import { Evaluation, Genome, GenomeOptions } from '../../index';
export declare function safeSampledMutateMany<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, mutateChance?: number, mutateType?: string, sampleSize?: number): Genome<T>[];
