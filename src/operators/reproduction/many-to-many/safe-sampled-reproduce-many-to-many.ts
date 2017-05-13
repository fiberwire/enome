import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { top } from "operators/top";
import { sampledReproduceManyToMany } from "operators/reproduction/many-to-many/sampled-reproduce-many-to-many";

//produces many offspring from many genomes, each one selected from a sample, then takes the top from original genomes and offspring
export function safeSampledReproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    weights: number[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    sampleSize: number = 5,
): Genome<T>[] {
    let offspring = sampledReproduceManyToMany(genomes, weights, n, fitness, sampleSize);
    let sorted = _.sortBy(_.concat(genomes, offspring), g => fitness(g).fitness).reverse();
    return sorted.slice(0, n);
}