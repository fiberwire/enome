
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";

import * as _ from 'lodash';

export function clone<T extends GenomeOptions>(gen: Genome<T>): Genome<T> {
    return _.clone(gen);
}