import {
  Genome,
  IEvaluation,
  IGenomeOptions,
  ReactiveCollection,
} from '../index';

export interface IDataEvaluation<Gen extends IGenomeOptions, Data, Pheno>
  extends IEvaluation<Gen, Pheno> {
  data: Data[];
}
