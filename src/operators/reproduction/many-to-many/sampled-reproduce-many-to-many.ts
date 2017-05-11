
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";

import * as _ from 'lodash';
import { best } from "operators/best";

//produces many offspring from many genomes, each one selected from a sample
export function sampledReproduceManyToMany<T extends GenomeOptions>(
    gens: Genome<T>[],
    weights: number[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T>,
    sampleSize: number = 5,
): Genome<T>[] {
    //create many genomes (according to n)
    return _.range(0, n)
        .map(i => {
            //create sample of genomes (according to sampleSize)
            let sample = _.range(0, sampleSize)
                .map(i => {
                    let offspringSeq: number[] = _.zip(gens.map(g => g.sequence))
                        .map((sequences: number[][]) => {
                            return chance.weighted(
                                chance.weighted(sequences, weights),
                                weights);
                        });

                    return new Genome(
                        chance.weighted(gens, weights).options,
                        offspringSeq
                    );
                })

            //return best genome from sample
            return best(sample, fitness).genome;
        })
}