import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
export interface Parent<T extends GenomeOptions> {
    genome: Genome<T>;
    age: number;
}
