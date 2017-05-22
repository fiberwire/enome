import { Genome } from '../../genotypes/genome';
import { GenomeOptions } from '../../options/genome-options';
export declare function sub<T extends GenomeOptions>(gen: Genome<T>, mutateChance: number): Genome<T>;
