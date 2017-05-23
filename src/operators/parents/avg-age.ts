import * as _ from 'lodash';
import { GenomeOptions } from '../../options/genome-options';
import { Parent } from '../../interfaces/parent';

export function avgAge<T extends GenomeOptions>(parents: Parent<T>[]): number {
    return _.meanBy(parents, p => p.age);
}