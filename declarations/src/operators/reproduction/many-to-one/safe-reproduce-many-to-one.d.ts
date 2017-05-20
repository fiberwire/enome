import { Evaluation, Genome, GenomeOptions } from '../../../index';
export declare function safeReproduceManyToOne<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T, U>, weights?: number[]): Genome<T>;
