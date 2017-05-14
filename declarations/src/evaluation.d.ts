import { GenomeOptions, Genome } from "./index";
export interface Evaluation<T extends GenomeOptions, U> {
    fitness: number;
    genome: Genome<T>;
    result: U;
}
