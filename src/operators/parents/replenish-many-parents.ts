import { IParent } from "../../interfaces/parent";
import { IGenomeOptions } from "../../options/genome-options";
import { replenishParent } from "./replenish-parent";

export function replenishManyParents<T extends IGenomeOptions>(parents: Array<IParent<T>>): Array<IParent<T>> {
    return parents.map(replenishParent);
}
