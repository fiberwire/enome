import { MutateType } from '../enums/mutate-type';
export interface MutateOptions {
    mutateChance: number;
    mutateType: MutateType;
    sampled: boolean;
    safe: boolean;
    sampleSize: number;
}