import { Evaluation } from '../../../evaluation';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
export declare function safeReproduceManyToOne<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (genome: Genome<T>) => Evaluation<T, U>, weights?: number[]): Genome<T>;
