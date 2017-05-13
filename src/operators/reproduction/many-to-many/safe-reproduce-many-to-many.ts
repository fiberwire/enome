
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { Evaluation } from "evalutation";
import { top } from "operators/top";

import * as _ from 'lodash';
import { reproduceManyToMany } from "operators/reproduction/many-to-many/reproduce-many-to-many";
import { value } from "operators/value";
import { avgFitness } from "operators/avg-fitness";

export function safeReproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
): Genome<T>[] {

    let result: Genome<T>[] = [];
    let avgFit = avgFitness(genomes, fitness);

    while (result.length < n) {
        result = _.concat(
            result,
            reproduceManyToMany(genomes, n, weights)
                .filter(g => fitness(g).fitness > avgFit)
        )
    }

    return result.slice(0, n);
}