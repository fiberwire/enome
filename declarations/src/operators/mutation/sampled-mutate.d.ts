import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { MutateType } from '../../enums/mutate-type';
export declare function sampledMutate<T extends GenomeOptions, U>(gen: Genome<T>, fitness: (gen: Genome<T>) => Evaluation<T, U>, sampleSize?: number, mutateChance?: number, mutateType?: MutateType): Genome<T>;
