import { Genome, IEvolvable, IGenomeOptions } from '../index';

export interface ISpecimen<Gen extends IGenomeOptions, Pheno>
  extends IEvolvable<Gen, Pheno> {
  age: number;
  genotype: Genome<Gen>;
  
  createPhenotype(genotype: Genome<Gen>): Pheno;
  ageSpecimen(n: number): ISpecimen<Gen, Pheno>;
}
