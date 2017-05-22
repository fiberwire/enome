import { Genome, GenomeOptions } from "../index";
export interface Selection<T extends GenomeOptions> {
    genome: Genome<T>;
    action: () => void;
}
