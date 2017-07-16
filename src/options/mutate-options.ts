import { MutateOp } from "../enums/mutate-op";

export interface IMutateOptions {
    mutateChance: number;
    mutateOp: MutateOp;
}
