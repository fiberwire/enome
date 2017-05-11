
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";
import { reproduceManyToMany } from "operators/reproduction/reproduce-many-to-many";
import { top } from "operators/top";

import * as _ from 'lodash';

export function safeReproduceManyToMany<T extends GenomeOptions>(
    gens: Genome<T>[],
    weights: number[],
    n: number, 
    fitness: (gen: Genome<T>) => Evaluation<T>
): Genome<T>[] {
    let offspring = reproduceManyToMany(gens, weights, n);
    return top(_.concat(gens, offspring), 0.5, fitness).map(e => e.genome);
}