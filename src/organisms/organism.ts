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
  IEvaluation,
  IEvolvable,
  IGenomeOptions,
  IOrganismOptions,
  IPopulationOptions,
  Population,
  ReactiveCollection,
  ReactiveProperty,
} from '../index';

export abstract class Organism<
  Gen extends IGenomeOptions,
  Pop extends IPopulationOptions,
  Org extends IOrganismOptions,
  Data,
  Pheno,
  AState,
  EState
> extends Agent<AState, EState> implements IEvolvable<Gen, Pheno> {
  public phenotype: Pheno;

  public alive: ReactiveProperty<boolean> = new ReactiveProperty(true);

  public get id(): string {
    return this.genotype.id;
  }

  constructor(public genotype: Genome<Gen>, public options: Org) {
    super();
    this.phenotype = this.createPhenotype(this.genotype);
  }

  public abstract interact(state: IStateUpdate<EState>): IAgentUpdate<AState>;

  public abstract observe(interaction: IInteraction<AState, EState>): Data;

  public abstract evaluate(
    data: Data[],
    genotype: Genome<Gen>,
    phenotype: Pheno
  ): IEvaluation<Gen, Data, Pheno>;

  public abstract createPhenotype(genotype: Genome<Gen>): Pheno;

  public evaluation(
    env: AgentEnvironment<AState, EState>,
    evaluations: Observer<IEvaluation<Gen, Data, Pheno>>
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
    interaction: IInteraction<AState, EState>
  ): Promise<Data> {
    return Promise.resolve(interaction).then(i => this.observe(i));
  }

  private async evaluateObservations(
    observations: Promise<Data[]>
  ): Promise<IEvaluation<Gen, Data, Pheno>> {
    return observations.then(o =>
      this.evaluate(o, this.genotype, this.phenotype)
    );
  }
}
