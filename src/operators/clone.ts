import * as _ from "lodash";
import { Genome, IGenomeOptions } from "../index";

export function clone<T extends IGenomeOptions>(gen: Genome<T>): Genome<T> {
    return _.clone(gen);
}
