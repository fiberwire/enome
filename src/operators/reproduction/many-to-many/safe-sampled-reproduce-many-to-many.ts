import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { top } from "operators/top";
import { sampledReproduceManyToMany } from "operators/reproduction/many-to-many/sampled-reproduce-many-to-many";
import { value } from "operators/value";
import { avgFitness } from "operators/avg-fitness";

//produces many offspring from many genomes, each group selected from a sample, then returns the best group of offspring
export function safeSampledReproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5,
): Genome<T>[] {
    let result: Genome<T>[] = [];
    let avgFit = avgFitness(genomes, fitness);

    while (result.length < n) {
        result = _.concat(
            result,
            sampledReproduceManyToMany(genomes, n, fitness, weights, sampleSize)
                .filter(g => fitness(g).fitness > avgFit)
        )
    }

    return result.slice(0, n);
}