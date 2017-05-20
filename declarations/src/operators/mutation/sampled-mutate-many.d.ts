import { Evaluation, Genome, GenomeOptions } from '../../index';
export declare function sampledMutateMany<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, mutateChance?: number, mutateType?: string, sampleSize?: number): Genome<T>[];
