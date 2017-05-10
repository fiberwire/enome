import { EnomeOptions, Genome } from "./index";
export interface Evaluation<T extends EnomeOptions> {
    fitness: number;
    genome: Genome<T>;
}
