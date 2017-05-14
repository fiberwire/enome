import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
export declare function reproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], n: number, weights?: number[]): Genome<T>[];
