import { FitnessObjective, IGenomeOptions, IPopulationOptions } from '../index';

export interface ISelectionOptions<Gen extends IGenomeOptions, Pheno>
  extends IPopulationOptions<Gen> {
  objective: FitnessObjective;
  generations: number;
}
