import * as _ from 'lodash';
import { GenomeOptions, Genome } from "../index";

export function generateGenomes<T extends GenomeOptions>(n: number, options: T): Genome<T>[] {
    return _.range(n).map(i => new Genome(options));
}