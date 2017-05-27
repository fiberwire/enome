import { MutateOp } from "../../enums/mutate-op";
import {
    avg,
    Genome,
    IGenomeOptions,
    sub,
} from "../../index";

export function mutate<T extends IGenomeOptions>(
    gen: Genome<T>,
    mutateChance: number = 0.05,
    mutateType: MutateOp = MutateOp.sub,
): Genome<T> {
    switch (mutateType) {
        case MutateOp.sub:
            return sub(gen, mutateChance);
        case MutateOp.avg:
            return avg(gen, mutateChance);
        default:
            return sub(gen, mutateChance);
    }
}
