import { Evaluation } from '../../evaluation';
import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
import { MutateType } from '../../enums/mutate-type';
export declare function safeSampledMutateMany<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, mutateChance?: number, mutateType?: MutateType, sampleSize?: number): Genome<T>[];
