import { MutateType } from '../enums/mutate-type';
import { MutateOp } from '../enums/mutate-op';
export interface MutateOptions {
    mutateChance: number;
    mutateOp: MutateOp;
    type: MutateType;
    sampleSize: number;
}