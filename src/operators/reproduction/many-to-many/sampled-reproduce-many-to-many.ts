import * as _ from 'lodash';
import { best } from '../../best';
import { Evaluation } from '../../../evaluation';
import { Genome } from '../../../genotypes/genome';
import { GenomeOptions } from '../../../options/genome-options';
import { reproduceManyToOne } from '../many-to-one/reproduce-many-to-one';
import { value } from '../../value';

//produces many offspring from many genomes, each one selected from a sample
export function sampledReproduceManyToMany<T extends GenomeOptions, U>(
    genomes: Genome<T>[],
    n: number,
    fitness: (gen: Genome<T>) => Evaluation<T, U>,
    sampleSize: number = 5,
    weights: number[] = _.range(0, genomes.length).map(i => value())
): Genome<T>[] {
    //create many genomes (according to n)
    return _.range(0, n)
        .map(i => {
            //create sample of genomes (according to sampleSize)
            let sample = _.range(0, sampleSize)
                .map(i => reproduceManyToOne(genomes, weights))

            //return best genome from sample
            return best(sample, fitness).genome;
        })
}