import * as _ from 'lodash';
import { Subscription } from 'rxjs';
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

  public subs = new Subscription();

  public get newGenome(): Genome<Gen> {
    return new Genome(this.options.genOptions);
  }

  public get newSpecimen(): ISpecimen<Gen, Pheno> {
    return this.createSpecimen(this.newGenome);
  }

  public get newOffspring(): ISpecimen<Gen, Pheno> {
    return this.reproduceSpecimen();
  }

  public get oldestParent(): ISpecimen<Gen, Pheno> {
    return _.maxBy(this.parents.value, p => p.age);
  }

  constructor(public options: IPopulationOptions<Gen>) {
    const { specimens, parents } = options;

    this.parents = this.initializeParents(options);
    this.specimens = this.initializeSpecimens(options);
  }

  public abstract createSpecimen(gen: Genome<Gen>): ISpecimen<Gen, Pheno>;

  public reproduceSpecimen(
    parents: Array<ISpecimen<Gen, Pheno>> = this.parents.value
  ): ISpecimen<Gen, Pheno> {
    const parentGens = parents.map(spec => spec.genotype);
    const offspring = reproduceManyToOne(parentGens);

    return this.createSpecimen(offspring);
  }

  public initializeSpecimens({
    specimens,
  }: IPopulationOptions<Gen>): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    if (this.parents !== undefined && this.parents.length > 0) {
      this.parents = this.initializeParents(this.options);
    }

    const specs = _.range(specimens).map(i => this.newOffspring);

    return new ReactiveCollection(specs);
  }

  public initializeParents({
    parents,
  }: IPopulationOptions<Gen>): ReactiveCollection<ISpecimen<Gen, Pheno>> {
    const specs = _.range(parents).map(i => this.newSpecimen);

    return new ReactiveCollection(specs);
  }

  public removeOldParents() {
    return this.parents
      .filter(parents => parents.length > this.options.parents)
      .subscribe(parents => {
        const n = parents.length - this.options.parents;

        for (let i = 0; i < n; i++) {
          this.parents.remove(this.oldestParent);
        }
      });
  }

  public kill(spec: ISpecimen<Gen, Pheno>) {
    this.specimens.remove(spec);
    this.specimens.push(this.newOffspring);
  }

  public killAt(index: number) {
    this.specimens.removeAt(index);
    this.specimens.push(this.newOffspring);
  }

  public keep(spec: ISpecimen<Gen, Pheno>) {
    const { removed } = this.specimens.remove(spec);
    this.parents.pushMap(removed, parent => parent.ageSpecimen(1));
    this.specimens.push(this.newOffspring);
  }

  public keepAt(index: number) {
    const { removed } = this.specimens.removeAt(index);
    this.parents.pushMap(removed, parent => parent.ageSpecimen(1));
    this.specimens.push(this.newOffspring);
  }

  public randomize(spec: ISpecimen<Gen, Pheno>) {
    this.specimens.remove(spec);
    this.specimens.push(this.newSpecimen);
  }

  public randomizeAt(index: number) {
    this.specimens.removeAt(index);
    this.specimens.push(this.newSpecimen);
  }
}
