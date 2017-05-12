
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';

export function worst<T extends GenomeOptions>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T>
): Evaluation<T> {
    return _.minBy(genomes.map(fitness), e => e.fitness);
}