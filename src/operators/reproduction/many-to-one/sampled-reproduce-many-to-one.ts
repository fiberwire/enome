import * as _ from 'lodash';
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { best } from "operators/best";
import { top } from "operators/top";
import { value } from "operators/value";

//produce one offspring from many provided genomes, each one selected from a sample
export function sampledReproduceManyToOne<T extends GenomeOptions>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5
): Genome<T> {
    //produce offspring
    let offspring = _.range(0, sampleSize)
    .map (i => {
        return reproduceManyToOne(genomes, weights);
    })

    return best(offspring, fitness).genome;
}