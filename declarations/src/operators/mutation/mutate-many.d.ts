import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
export declare function mutateMany<T extends GenomeOptions>(genomes: Genome<T>[], mutateChance?: number, mutateType?: string): Genome<T>[];
