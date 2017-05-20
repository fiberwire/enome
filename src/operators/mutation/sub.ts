import { Genome, GenomeOptions, value } from '../../index';

export function sub<T extends GenomeOptions>(gen: Genome<T>, mutateChance: number): Genome<T> {
    return new Genome(
        gen.options,
        gen.sequence.map(v => {
            if (value() <= mutateChance) {
                return value();
            }
            else {
                return v;
            }
        }));
}