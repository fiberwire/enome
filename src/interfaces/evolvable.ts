export interface IEvolvable<Pheno> {
  fitness: number;
  evaluated: boolean;
  evaluate(): number;
}
