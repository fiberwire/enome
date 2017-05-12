
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { Nucleotide } from "genotypes/nucleotide";

import * as _ from 'lodash';

export function bottom<T extends GenomeOptions>(
    genomes: Genome<T>[],
    threshold: number = 0.5,
    fitness: (genome: Genome<T>) => Evaluation<T>
): Evaluation<T>[] {
    //sort evaluations of genomes by fitness, ascending order
    let b = _.sortBy(genomes.map(fitness), e => e.fitness);

    //select just the ones that make the cut
    return new Nucleotide(threshold).elements(b);
}