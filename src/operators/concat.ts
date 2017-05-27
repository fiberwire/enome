import * as _ from "lodash";
import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";

// returns a new genome whose sequences is a concatenation of the two provided genomes
export function concat<T extends IGenomeOptions>(gen1: Genome<T>, gen2: Genome<T>) {
    return new Genome(
        gen1.options,
        _.concat(gen1.sequence, gen2.sequence),
    );
}
