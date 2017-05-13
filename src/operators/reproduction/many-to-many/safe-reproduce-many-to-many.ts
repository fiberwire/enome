
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";
import { top } from "operators/top";

import * as _ from 'lodash';
import { reproduceManyToMany } from "operators/reproduction/many-to-many/reproduce-many-to-many";

export function safeReproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    weights: number[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T>
): Genome<T>[] {
    let offspring = reproduceManyToMany(genomes, n, weights);
    let sorted = _.sortBy(_.concat(genomes, offspring), g => fitness(g).fitness).reverse();
    return sorted.slice(0, n);
}