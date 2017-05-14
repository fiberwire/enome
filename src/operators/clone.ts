import * as _ from 'lodash';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';

export function clone<T extends GenomeOptions>(gen: Genome<T>): Genome<T> {
    return _.clone(gen);
}