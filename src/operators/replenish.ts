
import { GenomeOptions } from "options/genome-options";
import { Genome } from "genotypes/genome";
import { clone } from "operators/clone";

//returns a new genome with the same options and sequence as the provided genome,
//essentially replenishing its nucleos
export function replenish<T extends GenomeOptions>(gen: Genome<T>): Genome<T> {
    return new Genome(gen.options, gen.sequence);
}