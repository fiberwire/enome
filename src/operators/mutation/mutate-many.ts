import * as _ from "lodash";
import { MutateOp } from "../../enums/mutate-op";
import { Genome, IGenomeOptions, mutate } from "../../index";

export function mutateMany<T extends IGenomeOptions>(
    genomes: Array<Genome<T>>,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
): Array<Genome<T>> {
    return genomes.map((g) => mutate(g, mutateChance, mutateType));
}
