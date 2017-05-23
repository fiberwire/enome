import { Parent } from '../../interfaces/parent';
import { GenomeOptions } from '../../options/genome-options';
import { replenishParent } from './replenish-parent';

export function replenishManyParents<T extends GenomeOptions>(parents: Parent<T>[]): Parent<T>[] {
    return parents.map(replenishParent);
}