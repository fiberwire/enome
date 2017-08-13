import { MutateOp } from "../enums/mutate-op";

export interface IMutateOptions {
    chance?: number;
    op?: MutateOp;
}
