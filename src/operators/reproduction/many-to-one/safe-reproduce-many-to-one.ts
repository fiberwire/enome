import * as _ from 'lodash';
import { avgFitness } from '../../avg-fitness';
import { best } from '../../best';
import { Evaluation } from '../../../evaluation';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { reproduceManyToOne } from './reproduce-many-to-one';
import { top } from '../../top';
import { value } from '../../value';

//produce one offspring from many provided genomes, then returns the offspring if it is better than the top 50% on average, otherwise returns the best genome
export function safeReproduceManyToOne<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    fitness: (genome: Genome<T>) => Evaluation<T, U>,
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