import { Genome, IGenomeOptions, ISpecimen } from '../index';

export interface IEvaluation<Gen extends IGenomeOptions, Pheno> {
  fitness: number;
  specimen: ISpecimen<Gen, Pheno>;
}
