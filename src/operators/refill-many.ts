import { Genome, IGenomeOptions, refill } from '../index';

export function refillMany<T extends IGenomeOptions>(
  genomes: Array<Genome<T>>
): Array<Genome<T>> {
  return genomes.map(refill);
}
