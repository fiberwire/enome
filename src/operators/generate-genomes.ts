import * as _ from 'lodash';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';

export function generateGenomes<T extends GenomeOptions>(n: number, options: T): Genome<T>[] {
    return _.range(n).map(i => new Genome(options));
}