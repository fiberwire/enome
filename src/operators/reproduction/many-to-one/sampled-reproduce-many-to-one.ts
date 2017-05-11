import * as _ from 'lodash';
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { best } from "operators/best";
import { top } from "operators/top";

//produce one offspring from many provided genomes, each one selected from a sample
export function sampledReproduceManyToOne<T extends GenomeOptions>(
    gens: Genome<T>[],
    weights: number[],
    fitness: (gen: Genome<T>) => Evaluation<T>,
    sampleSize: number = 5
): Genome<T> {
    //produce offspring
    let offspring = _.range(0, sampleSize)
    .map (i => {
        return reproduceManyToOne(gens, weights);
    })

    return best(offspring, fitness).genome;
}