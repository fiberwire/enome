import { Genome, IGenomeOptions, replenish } from "../index";

export function replenishMany<T extends IGenomeOptions>(genomes: Array<Genome<T>>): Array<Genome<T>> {
    return genomes.map(replenish);
}
