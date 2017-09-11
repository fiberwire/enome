import { Genome, IEvolvable, IGenomeOptions } from '../index';

export interface ISpecimen<Gen extends IGenomeOptions, Pheno>
  extends IEvolvable<Gen, Pheno> {
  age: number;

  createPhenotype(genotype: Genome<Gen>): Pheno;
  ageSpecimen(n: number): ISpecimen<Gen, Pheno>;
}
