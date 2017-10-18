import { Genome, IGenetic, IGenomeOptions } from '../index';

export interface ISpecimen<Gen extends IGenomeOptions, Pheno>
  extends IGenetic<Gen, Pheno> {
  age: number;
  ageSpecimen(n: number): ISpecimen<Gen, Pheno>;
}
