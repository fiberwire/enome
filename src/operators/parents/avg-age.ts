import * as _ from "lodash";
import { IParent } from "../../interfaces/parent";
import { IGenomeOptions } from "../../options/genome-options";

export function avgAge<T extends IGenomeOptions>(parents: Array<IParent<T>>): number {
    return _.meanBy(parents, (p) => p.age);
}
