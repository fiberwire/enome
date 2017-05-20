import { Genome, GenomeOptions } from '../../../index';
export declare function reproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], n: number, weights?: number[]): Genome<T>[];
