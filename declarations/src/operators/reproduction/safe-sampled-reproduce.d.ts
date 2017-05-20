import { Evaluation, Genome, GenomeOptions } from '../../index';
export declare function safeSampledReproduce<T extends GenomeOptions, U>(gen1: Genome<T>, gen2: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, samepleSize?: number, weight1?: number, weight2?: number, mutateChance?: number): Genome<T>;
