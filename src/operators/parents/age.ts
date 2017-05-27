import { IParent } from "../../interfaces/parent";
import { IGenomeOptions } from "../../options/genome-options";

export function age<T extends IGenomeOptions>(parent: IParent<T>, n: number = 1): IParent<T> {
    parent.age += n;
    return parent;
}
