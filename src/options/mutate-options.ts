import { MutateOp } from "../enums/mutate-op";
import { MutateType } from "../enums/mutate-type";
export interface MutateOptions {
    mutateChance: number;
    mutateOp: MutateOp;
    type: MutateType;
    sampleSize: number;
}
