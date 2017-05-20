import { Evaluation, Genome, GenomeOptions } from '../../index';
export declare function safeMutateMany<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, mutateChance?: number, mutateType?: string): Genome<T>[];
