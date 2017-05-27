import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";

export interface IParent<T extends IGenomeOptions> {
    genome: Genome<T>;
    age: number;
}
