import * as _ from 'lodash';
import { Observable, Subscription, Scheduler } from 'rxjs';
import {
  FitnessObjective,
  Genome,
  IGenomeOptions,
  IOrganism,
  ISelectionOptions,
  Population,
  ReactiveCollection,
  reproduceManyToOne,
} from '../index';

export abstract class Selection<
  Gen extends IGenomeOptions,
  Pheno
> extends Population<Gen, Pheno> {
  public specimens: ReactiveCollection<IOrganism<Gen, Pheno>>;
  public parents: ReactiveCollection<IOrganism<Gen, Pheno>>;

  public generation: number = 0;

  private evolution: Subscription;

  public get best(): Observable<IOrganism<Gen, Pheno>> {
    const { objective } = this.options;

    return this.parents
      .map(parents => this.bestParent)
      .distinctUntilChanged();
  }

  public get newSpecimen(): IOrganism<Gen, Pheno> {
    return this.createSpecimen(this.newGenome);
  }

  public get newOffspring(): IOrganism<Gen, Pheno> {
    return this.reproduceSpecimen();
  }

  public get worstParent(): IOrganism<Gen, Pheno> {
    const { objective } = this.options;

    switch (objective) {
      case FitnessObjective.minimize:
        return _.maxBy(this.parents.value, p => p.fitness);

      case FitnessObjective.maximize:
        return _.minBy(this.parents.value, p => p.fitness);
    }
  }

  public get bestParent(): IOrganism<Gen, Pheno> {
    const { objective } = this.options;

    switch (objective) {
      case FitnessObjective.minimize:
        return _.minBy(this.parents.value, p => p.fitness);

      case FitnessObjective.maximize:
        return _.maxBy(this.parents.value, p => p.fitness);
    }
  }

  public get evolving(): boolean {
    return (
      this.evolution !== undefined &&
      this.evolution !== null &&
      !this.evolution.closed
    );
  }

  constructor(public options: ISelectionOptions<Gen, Pheno>) {
    super(options);

    const { specimens, parents } = options;

    this.parents = this.initializeParents(options);
    this.specimens = this.initializeSpecimens(options);

    this.subs.add(this.incrementGeneration());

    this.start();
  }

  public abstract createSpecimen(gen: Genome<Gen>): IOrganism<Gen, Pheno>;

  public evolve() {
    const { objective, generations } = this.options;

    return this.specimens
      .asObservable()
      .takeWhile(s => this.generation < generations)
      .filter(s => s.length > 0)
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(specs => {
        const spec = specs[0];
        spec.evaluate();

        switch (objective) {
          case FitnessObjective.minimize:
            if (spec.fitness < this.worstParent.fitness) {
              this.keep(spec);
            } else {
              this.kill(spec);
            }
            break;

          case FitnessObjective.maximize:
            if (spec.fitness > this.worstParent.fitness) {
              this.keep(spec);
            } else {
              this.kill(spec);
            }
            break;
        }
      });
  }

  public start() {
    if (!this.evolving) {
      this.evolution = this.evolve();
    }
  }

  public stop() {
    this.evolution.unsubscribe();
  }

  public reproduceSpecimen(
    parents: Array<IOrganism<Gen, Pheno>> = this.parents.value
  ): IOrganism<Gen, Pheno> {
    const parentGens = parents.map(spec => spec.genotype);
    const offspring = reproduceManyToOne(parentGens);

    return this.createSpecimen(offspring);
  }

  public initializeParents({
    parents,
  }: ISelectionOptions<Gen, Pheno>): ReactiveCollection<IOrganism<Gen, Pheno>> {
    const specs = _.range(parents).map(i => this.newSpecimen);

    for (const spec of specs) {
      spec.evaluate();
    }

    return new ReactiveCollection(specs);
  }

  public initializeSpecimens({
    specimens,
  }: ISelectionOptions<Gen, Pheno>): ReactiveCollection<IOrganism<Gen, Pheno>> {
    if (this.parents !== undefined && this.parents.length > 0) {
      this.parents = this.initializeParents(this.options);
    }

    const specs = _.range(specimens).map(i => this.newOffspring);

    return new ReactiveCollection(specs);
  }

  public incrementGeneration() {
    return this.parents.pushed.subscribe(p => this.generation++);
  }
}
