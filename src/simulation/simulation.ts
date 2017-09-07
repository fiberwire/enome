import {
  Observable,
  ReplaySubject,
  Scheduler,
  Subject,
  Subscription,
} from 'rxjs';
import {
  FitnessObjective,
  IEvaluation,
  IGenomeOptions,
  IOrganismOptions,
  IPopulationOptions,
  Organism,
  Population,
  ReactiveCollection,
  ReactiveProperty,
} from '../index';

import { AgentEnvironment } from 'enviro-rx';
import * as _ from 'lodash';

export class Simulation<
  Gen extends IGenomeOptions,
  Pop extends IPopulationOptions,
  Org extends IOrganismOptions,
  Data,
  Pheno,
  AState,
  EState
> {
  public top: ReactiveCollection<
    IEvaluation<Gen, Data, Pheno>
  > = new ReactiveCollection();

  public avgFitness: ReactiveProperty<number> = new ReactiveProperty();

  public newOrganisms: ReplaySubject<
    Organism<Gen, Pop, Org, Data, Pheno, AState, EState>
  > = new ReplaySubject<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>(
    1
  );

  public organisms: ReactiveCollection<
    Organism<Gen, Pop, Org, Data, Pheno, AState, EState>
  > = new ReactiveCollection();

  public progress: ReactiveProperty<number> = new ReactiveProperty(0);

  // tslint:disable-next-line:variable-name
  private _best: ReactiveProperty<
    IEvaluation<Gen, Data, Pheno>
  > = new ReactiveProperty();

  private subs: Subscription = new Subscription();

  constructor(
    public population: Population<Gen, Pop, Org, Data, Pheno, AState, EState>,
    public environment: AgentEnvironment<AState, EState>
  ) {}

  public get best(): Observable<IEvaluation<Gen, Data, Pheno>> {
    return this._best
      .asObservable()
      .filter(b => b !== undefined && b != null)
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap);
  }

  public start(): Simulation<Gen, Pop, Org, Data, Pheno, AState, EState> {
    this.subs = new Subscription()
      .add(this.removeDeadOrganisms())
      .add(this.introduceOrganisms())
      .add(this.updateAvgFitness())
      .add(this.updateTop())
      .add(this.updateBest())
      .add(this.logProgress())
      .add(
        this.population.populate(
          this.newOrganisms,
          this.top,
          this.avgFitness,
          this.progress
        )
      );

    return this;
  }

  public stop(): void {
    this.subs.unsubscribe();
  }

  private updateBest(): Subscription {
    const update = this.population.evaluations
      .filter(e => e != null && e !== undefined)
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(
        evaluation => {
          if (this._best.value === undefined || this._best.value == null) {
            this._best.value = evaluation;
          }

          switch (this.population.popOptions.objective) {
            case FitnessObjective.minimize:
              if (evaluation.fitness < this._best.value.fitness) {
                this._best.value = evaluation;
              }
              break;

            case FitnessObjective.maximize:
              if (evaluation.fitness > this._best.value.fitness) {
                this._best.value = evaluation;
              }
              break;
          }
        },
        // tslint:disable-next-line:no-console
        error => console.log(`error from simulation.updateBest: ${error}`),
        // tslint:disable-next-line:no-console
        () => console.log('simulation complete')
      );

    return update;
  }

  private updateTop(): Subscription {
    const update = this.population.evaluations
      .filter(e => e != null && e !== undefined)
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(
        e => {
          const top = this.top.value;

          // default to 25% if topPercent is not specified
          const percent = this.population.popOptions.topPercent || 0.25;

          top.push(e);
          const sorted = _.sortBy(top, t => t.fitness);
          const taken = _.take(
            sorted,
            this.population.popOptions.size * percent
          );
          this.top.value = taken;
        },
        // tslint:disable-next-line:no-console
        error => console.log(`error from simulation.updateTop: ${error}`)
      );

    return update;
  }

  private updateAvgFitness(): Subscription {
    const update = this.population.evaluations
      .filter(e => e != null && e !== undefined)
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(
        e => {
          this.avgFitness.value = (this.avgFitness.value + e.fitness) / 2;
        },
        // tslint:disable-next-line:no-console
        error => console.log(`error from simulation.updateAvgFitness: ${error}`)
      );

    return update;
  }

  private introduceOrganisms(): Subscription {
    const intro = this.newOrganisms
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(
        org => {
          this.subs.add(org.interactWithEnvironment(this.environment));
          this.subs.add(
            org.evaluation(this.environment, this.population.evaluations)
          );

          this.organisms.push(org);
        },
        error =>
          // tslint:disable-next-line:no-console
          console.log(`error from simulation.introduceOrganism: ${error}`)
      );

    return intro;
  }

  private removeDeadOrganisms(): Subscription {
    const remove = this.organisms.subscribeToPush(o => {
      // when organism is introduced to environment
      o.alive
        .filter(alive => !alive) // if organisms is dead
        .subscribe(alive => {
          this.organisms.remove(o); // remove from organisms
        });
    });

    return remove;
  }

  private logProgress(): Subscription {
    if (this.population.popOptions.logProgress) {
      return this.progress
        .filter(
          p => this._best.value !== null && this._best.value !== undefined
        )
        .subscribe(p => {
          if (
            this.progress.value % this.population.popOptions.logInterval ===
            0
          ) {
            // tslint:disable-next-line:no-console
            console.log(
              `
    Generation: ${this.population.generation}/${this.population.popOptions
                .generations} (${_.round(this.progress.value)}%)
    Current Best - id: ${this._best.value.genotype.id}, fitness: ${this._best
                .value.fitness}
              `
            );
          }
        });
    } else {
      return null;
    }
  }
}
