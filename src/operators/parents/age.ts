import { GenomeOptions } from '../../options/genome-options';
import { Parent } from '../../interfaces/parent';

export function age<T extends GenomeOptions>(parent: Parent<T>, n: number = 1): Parent<T> {
    parent.age += n;
    return parent;
}