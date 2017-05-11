import { Genome, GenomeOptions } from "../index";
export declare function mutate<T extends GenomeOptions>(gen: Genome<T>, mutateChance?: number, mutateType?: string): Genome<T>;
