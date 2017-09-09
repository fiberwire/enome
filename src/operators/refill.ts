import { Genome } from '../genotypes/genome';
import { IGenomeOptions } from '../options/genome-options';
// returns a new genome with the same options and sequence as the provided genome,
// essentially replenishing its genes
export function refill<T extends IGenomeOptions>(gen: Genome<T>): Genome<T> {
  return new Genome(gen.options, gen.sequence);
}
