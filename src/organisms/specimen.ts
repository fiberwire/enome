import { Genome, IEvolvable, IGenomeOptions } from '../index';

export abstract class Specimen<Gen extends IGenomeOptions, Pheno>
  implements IEvolvable<Gen, Pheno> {
  public genotype: Genome<Gen>;

  public phenotype: Pheno;

  public abstract createPhenotype(genotype: Genome<Gen>): Pheno;
}
