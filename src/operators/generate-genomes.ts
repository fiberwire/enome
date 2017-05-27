import * as _ from "lodash";
import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";

export function generateGenomes<T extends IGenomeOptions>(n: number, options: T): Array<Genome<T>> {
    return _.range(n).map((i) => new Genome(options));
}
