import { Genome, IGenomeOptions, weight } from '../../index';

export function sub<T extends IGenomeOptions>(
  gen: Genome<T>,
  mutateChance: number
): Genome<T> {
  return new Genome(
    gen.options,
    gen.sequence.map(v => {
      if (weight() <= mutateChance) {
        return weight();
      } else {
        return v;
      }
    })
  );
}
