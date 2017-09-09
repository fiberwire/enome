import { Genome, IEvolvable, IGenomeOptions } from '../index';

export abstract class Specimen<Gen extends IGenomeOptions, Pheno>
  implements IEvolvable<Gen, Pheno> {
  public phenotype: Pheno;

  constructor(public genotype: Genome<Gen>, public age: number = 0) {
    this.phenotype = this.createPhenotype(genotype);
  }

  public abstract createPhenotype(genotype: Genome<Gen>): Pheno;

  public abstract ageSpecimen(n: number): Specimen<Gen, Pheno>;
}
