import * as _ from 'lodash';
import { avgFitness } from '../../avg-fitness';
import { best } from '../../best';
import { Evaluation } from '../../../evaluation';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { sampledReproduceManyToOne } from './sampled-reproduce-many-to-one';
import { top } from '../../top';
import { value } from '../../value';

//produce one offspring, selected from a sample, from many provided genomes, then returns the offspring if it is in the top 50%, otherwise returns the best genome
export function safeSampledReproduceManyToOne<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
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