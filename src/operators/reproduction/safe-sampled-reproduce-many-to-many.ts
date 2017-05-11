import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { sampledReproduceManyToMany } from "operators/reproduction/sampled-reproduce-many-to-many";
import { top } from "operators/top";

//produces many offspring from many genomes, each one selected from a sample, then takes the top from original genomes and offspring
export function safeSampledReproduceManyToMany<T extends GenomeOptions>(
    gens: Genome<T>[],
    weights: number[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    sampleSize: number = 5,
): Genome<T>[] {
    let offspring = sampledReproduceManyToMany(gens, weights, n, fitness, sampleSize);
    return top(_.concat(gens, offspring), 0.5, fitness).map(e => e.genome);
}