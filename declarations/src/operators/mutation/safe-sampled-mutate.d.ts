import { MutateType } from '../../enums/mutate-type';
import { GenomeOptions } from '../../options/genome-options';
import { Genome } from '../../genotypes/genome';
import { Evaluation } from '../../evaluation';
export declare function safeSampledMutate<T extends GenomeOptions, U>(gen: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, sampleSize?: number, mutateChance?: number, mutateType?: MutateType): Genome<T>;
