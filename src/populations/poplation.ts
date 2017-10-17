import * as _ from 'lodash';
import {
  Genome,
  IGenomeOptions,
  IPopulationOptions,
  ISpecimen,
  ReactiveCollection,
} from '../index';
import { reproduceManyToOne } from '../operators/reproduction/reproduce-many-to-one';

export abstract class Population<Gen extends IGenomeOptions, Pheno> {
  public specimens: ReactiveCollection<ISpecimen<Gen, Pheno>>;
  public parents: ReactiveCollection<ISpecimen<Gen, Pheno>>;

  private get newGenome(): Genome<Gen> {
    return new Genome(this.options.genOptions);
  }

  private get newSpecimen(): ISpecimen<Gen, Pheno> {
    return this.createSpecimen(this.newGenome);
  }

  private get newOffspring(): ISpecimen<Gen, Pheno> {
    return this.reproduceSpecimen();
  }

  constructor(public options: IPopulationOptions<Gen>) {
    const { specimens, parents } = options;
    this.specimens = this.initializeSpecimens(options);
    this.parents = this.initializeParents(options);
  }

  public abstract createSpecimen(gen: Gen | Genome<Gen>): ISpecimen<Gen, Pheno>;

  public reproduceSpecimen(): ISpecimen<Gen, Pheno> {
    const parentGens = this.parents.mapCollection(spec => spec.genotype).value;
    const offspring = reproduceManyToOne(parentGens);

    return this.createSpecimen(offspring);
  }

  public initializeSpecimens({
    specimens,
    genOptions,
  }: IPopulationOptions<Gen>): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    const specs = _.range(specimens).map(i => this.createSpecimen(genOptions));

    return new ReactiveCollection(specs);
  }

  public initializeParents({
    parents,
    genOptions,
  }: IPopulationOptions<Gen>): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    const specs = _.range(parents).map(i => this.createSpecimen(genOptions));

    return new ReactiveCollection(specs);
  }

  public kill(spec: ISpecimen<Gen, Pheno>) {
    this.specimens.remove(spec);
  }

  public killAt(index: number) {
    this.specimens.removeAt(index);
  }

  public keep(spec: ISpecimen<Gen, Pheno>) {
    this.specimens.remove(spec);
  }

  private reproduceNext() {
    return this.specimens.removed
      .take(1)
      .subscribe(removed => {
        this.specimens.push(this.newOffspring);
      });
  }

  private randomizeNext() {
    return this.specimens.removed
      .take(1)
      .subscribe(removed => {
        this.specimens.push(this.newSpecimen);
      });
  }
}
