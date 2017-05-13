import * as _ from 'lodash';
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";

import * as Chance from 'chance';
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { value } from "operators/value";
const chance = new Chance();

export function reproduceManyToMany<T extends GenomeOptions>(
    genomes: Genome<T>[],
    n: number,
    weights: number[] = _.range(0, genomes.length).map(i => value())
): Genome<T>[] {
    return _.range(0, n)
        .map(i => reproduceManyToOne(genomes, weights));
}