import { Evaluation, Genome, GenomeOptions } from '../../index';
export declare function sampledMutate<T extends GenomeOptions, U>(gen: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, sampleSize?: number, mutateChance?: number, mutateType?: string): Genome<T>;
