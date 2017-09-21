import {
  Agent,
  AgentEnvironment,
  IAgent,
  IAgentUpdate,
  IInteraction,
  IStateUpdate,
} from 'enviro-rx';
import {
  Observable,
  Observer,
  ReplaySubject,
  Scheduler,
  Subject,
  Subscription,
} from 'rxjs';

import * as _ from 'lodash';
import {
  Genome,
  IArtificialAState,
  IArtificialEState,
  IDataEvaluation,
  IEvolvable,
  IGenomeOptions,
  IOrganism,
  IOrganismOptions,
  IPopulationOptions,
  ISpecimen,
  NaturalSelection,
  ReactiveCollection,
  ReactiveProperty,
} from '../index';

export abstract class Organism<
  Gen extends IGenomeOptions,
  Pop extends IPopulationOptions,
  Org extends IOrganismOptions,
  Data,
  Pheno extends IAgent<AState, EState>,
  AState,
  EState
> implements IOrganism<Gen, Pheno, AState, EState> {
  public interactionCount: number;
  public age: number;
  public phenotype: Pheno;

  public alive: ReactiveProperty<boolean> = new ReactiveProperty(true);

  public get id(): string {
    return this.genotype.id;
  }

  constructor(public genotype: Genome<Gen>, public options: Org) {
    this.phenotype = this.createPhenotype(this.genotype);
  }

  public abstract interact(
    state: IStateUpdate<IArtificialEState<Gen, Pheno>>
  ): IAgentUpdate<IArtificialAState>;

  public abstract observe(
    interaction: IInteraction<IArtificialAState, IArtificialEState<Gen, Pheno>>
  ): Data;

  public abstract ageSpecimen(n: number): ISpecimen<Gen, Pheno>;

  public abstract evaluate(
    data: Data[],
    genotype: Genome<Gen>,
    phenotype: Pheno
  ): IDataEvaluation<Gen, Data, Pheno>;

  public abstract createPhenotype(genotype: Genome<Gen>): Pheno;

  public evaluation(
    env: AgentEnvironment<IArtificialAState, IArtificialEState<Gen, Pheno>>,
    evaluations: Observer<IDataEvaluation<Gen, Data, Pheno>>
  ): Subscription {
    return env
      .agentInteractions(this.id)
      .map(i => this.observeInteraction(i))
      .bufferCount(this.options.interactions)
      .map(d => Promise.all(d))
      .map(d => this.evaluateObservations(d))
      .take(1)
      .subscribe(async e => {
        evaluations.next(await e);
      });
  }

  // collects data from interactions
  private async observeInteraction(
    interaction: IInteraction<IArtificialAState, IArtificialEState<Gen, Pheno>>
  ): Promise<Data> {
    return Promise.resolve(interaction).then(i => this.observe(i));
  }

  private async evaluateObservations(
    observations: Promise<Data[]>
  ): Promise<IDataEvaluation<Gen, Data, Pheno>> {
    return observations.then(o =>
      this.evaluate(o, this.genotype, this.phenotype)
    );
  }
}
