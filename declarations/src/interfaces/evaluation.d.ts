import { GenomeOptions } from '../options/genome-options';
import { Genome } from '../genotypes/genome';
export interface Evaluation<T extends GenomeOptions, U> {
    fitness: number;
    genome: Genome<T>;
    result: U;
}
