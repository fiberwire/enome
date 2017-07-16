import { Genome, IGenomeOptions, refresh } from "../index";

export function refreshMany<T extends IGenomeOptions>(genomes: Array<Genome<T>>): Array<Genome<T>> {
    return genomes.map(refresh);
}
