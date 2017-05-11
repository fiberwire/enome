import * as _ from 'lodash';
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { best } from "operators/best";
import { top } from "operators/top";

//produce one offspring from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
export function safeReproduceManyToOne<T extends GenomeOptions>(
    gens: Genome<T>[],
    weights: number[],
    fitness: (gen: Genome<T>) => Evaluation<T>
): Genome<T> {
    let offspring = reproduceManyToOne(gens, weights);
    let t = top(_.concat([offspring], gens), 0.5, fitness).map(e => e.genome);

    if (_.includes(t, offspring)) {
        return offspring;
    }
    else {
        return best(t, fitness).genome;
    }
}