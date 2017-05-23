import { Genome, GenomeOptions, replenish } from "../index";

export function replenishMany<T extends GenomeOptions>(genomes: Genome<T>[]): Genome<T>[] {
    return genomes.map(replenish);
}