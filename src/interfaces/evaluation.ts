import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";

export interface IEvaluation<T extends IGenomeOptions, U> {
    fitness: number;
    genome: Genome<T>;
    result: U;
}
