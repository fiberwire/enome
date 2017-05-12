
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";
import { top } from "operators/top";

import * as _ from 'lodash';
import { reproduceManyToMany } from "operators/reproduction/many-to-many/reproduce-many-to-many";

export function safeReproduceManyToMany<T extends GenomeOptions>(
    gens: Genome<T>[],
    weights: number[],
    n: number, 
    fitness: (gen: Genome<T>) => Evaluation<T>
): Genome<T>[] {
    let offspring = reproduceManyToMany(gens, weights, n);
    return top(_.concat(gens, offspring), 0.5, fitness).map(e => e.genome);
}