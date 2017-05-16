import * as _ from 'lodash';
import { Evaluation } from '../evaluation';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
import { Nucleotide } from '../genotypes/nucleotide';

export function bottom<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T, U>,
    percent: number = 0.5
): Evaluation<T, U>[] {
    //sort evaluations of genomes by fitness, ascending order
    let b = _.sortBy(genomes.map(fitness), e => e.fitness);

    //select just the ones that make the cut
    return new Nucleotide(percent).elements(b);
}