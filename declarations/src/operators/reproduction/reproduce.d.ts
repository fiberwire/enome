import { Genome, GenomeOptions } from '../../index';
export declare function reproduce<T extends GenomeOptions>(gen1: Genome<T>, gen2: Genome<T>, weight1?: number, weight2?: number, mutateChance?: number): Genome<T>;
