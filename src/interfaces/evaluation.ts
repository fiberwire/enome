import { Genome, IGenomeOptions, ReactiveCollection } from '../index';

export interface IEvaluation<
  GenType extends IGenomeOptions,
  DataType,
  PhenoType
> {
  fitness: number;
  genotype: Genome<GenType>;
  data: DataType[];
  phenotype: PhenoType;
}
