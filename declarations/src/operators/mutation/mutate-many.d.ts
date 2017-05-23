import { MutateType } from '../../enums/mutate-type';
import { Genome, GenomeOptions } from '../../index';
export declare function mutateMany<T extends GenomeOptions>(genomes: Genome<T>[], mutateChance?: number, mutateType?: MutateType): Genome<T>[];
