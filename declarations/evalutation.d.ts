import { GenomeOptions, Genome } from "./index";
export interface Evaluation<T extends GenomeOptions> {
    fitness: number;
    genome: Genome<T>;
}
