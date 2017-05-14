import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
export declare function safeSampledMutate<T extends GenomeOptions, U>(gen: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, sampleSize?: number, mutateChance?: number, mutateType?: string): Genome<T>;
