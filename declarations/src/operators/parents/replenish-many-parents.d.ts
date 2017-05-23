import { Parent } from '../../interfaces/parent';
import { GenomeOptions } from '../../options/genome-options';
export declare function replenishManyParents<T extends GenomeOptions>(parents: Parent<T>[]): Parent<T>[];
