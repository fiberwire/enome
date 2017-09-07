import { Observable, Observer, Scheduler, Subject, Subscription } from 'rxjs';

import {
  cloneEvaluation,
  cloneOrganism,
  FitnessObjective,
  Gene,
  Genome,
  GenomeRefill,
  IEvaluation,
  IGenomeOptions,
  IOrganismOptions,
  IPopulationOptions,
  mutate,
  MutateOp,
  Organism,
  ReactiveCollection,
  ReactiveProperty,
  reproduceManyToOne,
  value,
} from '../index';

import * as Chance from 'chance';
import * as _ from 'lodash';
const chance = new Chance();

export abstract class Population<
  Gen extends IGenomeOptions,
  Pop extends IPopulationOptions,
  Org extends IOrganismOptions,
  Data,
  Pheno,
  AState,
  EState
> {
  public evaluations: Subject<IEvaluation<Gen, Data, Pheno>> = new Subject<
    IEvaluation<Gen, Data, Pheno>
  >();

  public generation: number = 0;

  private subs: Subscription = new Subscription();

  constructor(
    public genOptions: Gen,
    public popOptions: Pop,
    public orgOptions: Org
  ) {
    // set default genOptions
    const genDefaults = {
      geneLength: 2,
      refill: GenomeRefill.extend,
    };

    // tslint:disable-next-line:prefer-object-spread
    this.genOptions = Object.assign(genDefaults, this.genOptions);

    // set default popOptions
    const popDefaults = {
      logInterval: 10, // 10 percent
      logProgress: false,
      mutate: {
        chance: 0.05,
        op: MutateOp.sub,
      },
      topPercent: 0.25,
      updateWeights: {
        randomize: 25,
        reproduce: 75,
      },
    };

    // tslint:disable-next-line:prefer-object-spread
    this.popOptions = Object.assign(popDefaults, this.popOptions);
  }

  // create an organism to inject into environment.
  public abstract createOrganism(
    genome: Genome<Gen>,
    options: IOrganismOptions
  ): Organism<Gen, Pop, Org, Data, Pheno, AState, EState>;

  public mutate(genome: Genome<Gen>): Genome<Gen> {
    return mutate(
      genome,
      this.popOptions.mutate.chance,
      this.popOptions.mutate.op
    );
  }

  public createOrganisms(
    n: number
  ): Array<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>> {
    return _.range(n).map(i =>
      this.createOrganism(new Genome(this.genOptions), this.orgOptions)
    );
  }

  public populate(
    organisms: Observer<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>,
    top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    avgFitness: ReactiveProperty<number>,
    progress: ReactiveProperty<number>
  ): Subscription {
    const orgs = this.createOrganisms(this.popOptions.size);

    for (const o of orgs) {
      organisms.next(o);
    }

    return this.updateGenotype(this.evaluations, top, avgFitness)
      .map(genome => this.createOrganism(genome, this.orgOptions))
      .take(this.popOptions.generations)
      .do(g => {
        this.generation++;
        progress.value = this.generation * 100 / this.popOptions.generations;
      })
      .observeOn(Scheduler.asap)
      .subscribeOn(Scheduler.asap)
      .subscribe(
        o => organisms.next(o),
        // tslint:disable-next-line:no-console
        error => console.log(`population.populate(): ${error.stack}`),
        // tslint:disable-next-line:no-console
        () =>
          // tslint:disable-next-line:no-console
          console.log(
            `Evolution completed after ${this.generation++} generations.`
          )
      );
  }

  // update genotypes as they are evaluated
  public updateGenotype(
    evaluations: Observable<IEvaluation<Gen, Data, Pheno>>,
    top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    avgFitness: ReactiveProperty<number>
  ): Observable<Genome<Gen>> {
    return evaluations.map(e => {
      // default to 25/75 split if weights are not specified
      const weights = this.popOptions.updateWeights || {
        randomize: 25,
        reproduce: 75,
      };

      // choose whether to reproduce or randomize
      const update = chance.weighted(
        [this.randomizeGenotype.bind(this), this.reproduceGenotype.bind(this)],
        [weights.randomize, weights.reproduce]
      );

      switch (this.popOptions.objective) {
        case FitnessObjective.maximize:
          if (e.fitness > avgFitness.value) {
            // better than average
            return e.genotype;
          } else {
            // worse than average
            return update(e, top, avgFitness);
          }

        case FitnessObjective.minimize:
          if (e.fitness < avgFitness.value) {
            // better than average
            return e.genotype;
          } else {
            // worse than average
            return update(e, top, avgFitness);
          }
      }
    });
  }

  private reproduceGenotype(
    evaluation: IEvaluation<Gen, Data, Pheno>,
    top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    avgFitness: ReactiveProperty<number>
  ): Genome<Gen> {
    if (top.value.length > 0 && top.value != null && top.value !== undefined) {
      // offspring of all top genotypes
      const offspring = reproduceManyToOne(top.value.map(t => t.genotype));

      // mutate offspring
      const mutantOffspring = this.mutate(offspring);

      return mutantOffspring;
    } else {
      return this.mutate(evaluation.genotype);
    }
  }

  private randomizeGenotype(
    evaluation: IEvaluation<Gen, Data, Pheno>,
    top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    avgFitness: ReactiveProperty<number>
  ): Genome<Gen> {
    return new Genome(this.genOptions);
  }
}
