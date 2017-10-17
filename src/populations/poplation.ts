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

    this.parents = this.initializeParents(options);
    this.specimens = this.initializeSpecimens(options);
  }

  public abstract createSpecimen(gen: Genome<Gen>): ISpecimen<Gen, Pheno>;

  public reproduceSpecimen(parents: Array<ISpecimen<Gen, Pheno>> = this.parents.value): ISpecimen<Gen, Pheno> {
    const parentGens = parents.map(spec => spec.genotype);
    const offspring = reproduceManyToOne(parentGens);

    return this.createSpecimen(offspring);
  }

  public initializeSpecimens({
    specimens,
    genOptions,
  }: IPopulationOptions<Gen>): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    if (this.parents !== undefined && this.parents.length > 0) {
      this.parents = this.initializeParents(this.options);
    }

    const specs = _.range(specimens).map(i => this.newOffspring);

    return new ReactiveCollection(specs);
  }

  public initializeParents({
    parents,
    genOptions,
  }: IPopulationOptions<Gen>): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    const specs = _.range(parents).map(i => this.newSpecimen);

    return new ReactiveCollection(specs);
  }

  public kill(spec: ISpecimen<Gen, Pheno>) {
    this.reproduceNext();
    this.specimens.remove(spec);
  }

  public killAt(index: number) {
    this.reproduceNext();
    this.specimens.removeAt(index);
  }

  public keep(spec: ISpecimen<Gen, Pheno>) {
    this.reproduceNext();
    this.specimens.remove(spec);
  }

  public keepAt(index: number) {
    this.reproduceNext();
    this.specimens.removeAt(index);
  }

  public randomize(spec: ISpecimen<Gen, Pheno>) {
    this.randomizeNext();
    this.specimens.remove(spec);
  }

  public randomizeAt(index: number) {
    this.randomizeNext();
    this.specimens.removeAt(index);
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
