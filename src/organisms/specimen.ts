import { Genome, IEvolvable, IGenomeOptions } from '../index';

export abstract class Specimen<Gen extends IGenomeOptions, Pheno>
  implements IEvolvable<Gen, Pheno> {
  public age: number;
  public phenotype: Pheno;

  constructor(public genotype: Genome<Gen>) {
    this.phenotype = this.createPhenotype(genotype);
  }

  public abstract createPhenotype(genotype: Genome<Gen>): Pheno;

  public ageSpecimen(n: number = 1): Specimen<Gen, Pheno> {
    return {
      age: this.age + n,
      ageSpecimen: this.ageSpecimen,
      createPhenotype: this.createPhenotype,
      genotype: this.genotype,
      phenotype: this.phenotype,
    };
  }
}
