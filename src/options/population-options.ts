import { FitnessObjective, IMutateOptions } from '../index';

export interface IPopulationOptions {
  generations: number;
  mutate?: IMutateOptions;
  objective: FitnessObjective;
  logInterval?: number;
  logProgress?: boolean;
  size: number;
  topPercent?: number;
  updateWeights?: {
    randomize: number;
    reproduce: number;
  };
}
