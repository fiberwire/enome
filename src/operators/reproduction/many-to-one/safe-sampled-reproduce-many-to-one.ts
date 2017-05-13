import * as _ from 'lodash';
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { Evaluation } from "evalutation";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { best } from "operators/best";
import { top } from "operators/top";
import { sampledReproduceManyToOne } from "operators/reproduction/many-to-one/sampled-reproduce-many-to-one";
import { value } from "operators/value";

//produce one offspring, selected from a sample, from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
export function safeSampledReproduceManyToOne<T extends GenomeOptions>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T>,
    weights: number[] = _.range(0, genomes.length).map(i => value()),
    sampleSize: number = 5
): Genome<T> {
    let offspring = sampledReproduceManyToOne(genomes, fitness, weights, sampleSize);
    let offspringFitness = fitness(offspring).fitness;
    let t = top(genomes, 0.5, fitness);
    let avgFitness = _.meanBy(t, e => e.fitness);

    if (offspringFitness > avgFitness) {
        return offspring;
    }
    else {
        return best(genomes, fitness).genome;
    }
}