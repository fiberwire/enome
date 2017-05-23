import { FillType } from '../enums/fill-type';
import { FitnessObjective } from '../enums/fitness-objective';
import { MutateOptions } from './mutate-options';
import { ReproduceOptions } from './reproduce-options';
export interface NaturalSelectionOptions {
    populationSize: number;
    fillType: FillType;
    fillPercent: number;
    reproduceOptions: ReproduceOptions;
    mutateOptions: MutateOptions;
    objective: FitnessObjective;
}
