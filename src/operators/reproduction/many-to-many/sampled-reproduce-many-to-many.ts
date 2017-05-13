
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { best } from "operators/best";
import { reproduceManyToMany } from "operators/reproduction/many-to-many/reproduce-many-to-many";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { value } from "operators/value";

//produces many offspring from many genomes, each one selected from a sample
export function sampledReproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5,
): Genome<T>[] {
    //create many genomes (according to n)
    return _.range(0, n)
        .map(i => {
            //create sample of genomes (according to sampleSize)
            let sample = _.range(0, sampleSize)
                .map(i => reproduceManyToOne(genomes, weights))

            //return best genome from sample
            return best(sample, fitness).genome;
        })
}