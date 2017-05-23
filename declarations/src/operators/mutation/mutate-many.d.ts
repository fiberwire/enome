import { MutateOp } from '../../enums/mutate-op';
import { Genome, GenomeOptions } from '../../index';
export declare function mutateMany<T extends GenomeOptions>(genomes: Genome<T>[], mutateChance?: number, mutateType?: MutateOp): Genome<T>[];
