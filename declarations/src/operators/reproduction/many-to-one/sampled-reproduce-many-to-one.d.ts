import { Evaluation } from '../../../evaluation';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
export declare function sampledReproduceManyToOne<T extends GenomeOptions, U>(genomes: Genome<T>[], fitness: (gen: Genome<T>) => Evaluation<T, U>, weights?: number[], sampleSize?: number): Genome<T>;
