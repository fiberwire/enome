import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
export declare function reproduceManyToOne<T extends GenomeOptions>(genomes: Genome<T>[], weights?: number[]): Genome<T>;
