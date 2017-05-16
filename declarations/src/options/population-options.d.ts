import { MutateOptions } from './mutate-options';
import { ReproduceOptions } from './reproduce-options';
export interface PopulationOptions {
    populationSize: number;
    fillType: string;
    fillPercent: number;
    reproduceOptions: ReproduceOptions;
    mutateOptions: MutateOptions;
}
