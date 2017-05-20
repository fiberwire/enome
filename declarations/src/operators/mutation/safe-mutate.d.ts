import { Evaluation, Genome, GenomeOptions } from '../../index';
export declare function safeMutate<T extends GenomeOptions, U>(gen: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, mutateChance?: number, mutateType?: string): Genome<T>;
