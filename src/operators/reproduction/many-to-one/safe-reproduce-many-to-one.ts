import * as _ from 'lodash';
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { best } from "operators/best";
import { top } from "operators/top";
import { value } from "operators/value";

//produce one offspring from many provided genomes, then returns the offspring if it is better than the top 50% on average, otherwise returns the best genome
export function safeReproduceManyToOne<T extends GenomeOptions>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
): Genome<T> {
    let offspring = reproduceManyToOne(genomes, weights);
    let t = top(genomes, 0.5, fitness);
    let offspringFitness = fitness(offspring).fitness;
    let avgFitness = _.meanBy(t, e => e.fitness);

    if (offspringFitness > avgFitness) {
        return offspring;
    }
    else {
        return best(genomes, fitness).genome;
    }
}