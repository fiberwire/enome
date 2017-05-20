import * as _ from 'lodash';
import { Genome, GenomeOptions } from '../index';

export function clone<T extends GenomeOptions>(gen: Genome<T>): Genome<T> {
    return _.clone(gen);
}