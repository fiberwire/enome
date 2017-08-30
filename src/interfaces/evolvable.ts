
import { Genome, IGenomeOptions } from "../index";

export interface IEvolvable<Gen extends IGenomeOptions, Pheno> {
    genotype: Genome<Gen>;
    phenotype: Pheno;

    createPhenotype(genotype: Genome<Gen>): Pheno;
}
