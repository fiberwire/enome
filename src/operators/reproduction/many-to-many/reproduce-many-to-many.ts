

import * as _ from 'lodash';
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";

export function reproduceManyToMany<T extends GenomeOptions>(genomes: Genome<T>[], weights: number[], n: number): Genome<T>[] {
    return _.range(0, n)
        .map(i => {
            let offspringSeq: number[] = _.zip(genomes.map(g => g.sequence))
                .map((sequences: number[][]) => {
                    return chance.weighted(
                        chance.weighted(sequences, weights),
                        weights);
                });

            return new Genome(
                chance.weighted(genomes, weights).options,
                offspringSeq
            );
        })
}