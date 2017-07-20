import { Observable, Observer, Subject, Subscription } from "rxjs";

import * as _ from "lodash";
import { IScheduler, Scheduler } from "rxjs/Scheduler";
import {
    Environment,
    Genome,
    IAgentUpdate,
    IEvaluation,
    IGenomeOptions,
    IOrganismOptions,
    IPopulationOptions,
    IStateUpdate,
    Population,
    ReactiveCollection,
    ReactiveProperty,
} from "../index";

export abstract class Organism<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    OrgType extends IOrganismOptions,
    DataType, PhenoType, AgentStateType, EnvStateType> {
    public phenotype: PhenoType;

    constructor(public genotype: Genome<GenType>,
                public options: OrgType) {
        this.phenotype = this.createPhenotype(this.genotype);
    }

    public abstract perceive(state: IStateUpdate<EnvStateType>): IStateUpdate<AgentStateType>;

    public abstract interact(
        state: IStateUpdate<AgentStateType>, phenotype: PhenoType): IStateUpdate<EnvStateType>;

    public abstract observe(interaction: IStateUpdate<EnvStateType>): DataType;

    public abstract evaluate(
        data: DataType[], genotype: Genome<GenType>, phenotype: PhenoType): IEvaluation<GenType, DataType, PhenoType>;

    public abstract createPhenotype(genome: Genome<GenType>): PhenoType;

    // perceive environment
    // interact with environment state
    // observe interactions
    // evaluate observations
    public interactWithEnvironment(
        state: Observable<IStateUpdate<EnvStateType>>,
        env: Observer<IStateUpdate<EnvStateType>>,
        evaluate: Observer<IEvaluation<GenType, DataType, PhenoType>>): Subscription {
        const perception = this.perceiveEnvironment(state);
        const interactions = this.interactWithState(perception);
        const observations = this.observeInteractions(interactions);
        const evaluations = this.evaluateObservations(observations);

        return [
            interactions.subscribe(env), // send interactions to environment
            evaluations.subscribe(evaluate), // send evaluations to population
        ].reduce((sub, s) => sub.add(s));
    }

    // turn env state into perception of env state
    // perception is just the information that is relevant to this particular organism
    private perceiveEnvironment(
        state: Observable<IStateUpdate<EnvStateType>>): Observable<IStateUpdate<AgentStateType>> {
        return state
            .map((s) => this.perceive(s));
    }

    // turn perception of env state into interacted state
    private interactWithState(state: Observable<IStateUpdate<AgentStateType>>): Observable<IAgentUpdate<EnvStateType>> {
        return state
            .map((s) => this.interact(s, this.phenotype))
            .map((i) => {
                // add agentID to interaction
                return { agentID: this.genotype.id, ...i };
            });
    }

    // adds observations to this.data
    private observeInteractions(interactions: Observable<IStateUpdate<EnvStateType>>): Observable<DataType> {
        return interactions
            .map((s) => this.observe(s));
    }

    private evaluateObservations(
        observations: Observable<DataType>,
    ): Observable<IEvaluation<GenType, DataType, PhenoType>> {
        const time: Observable<DataType[]> = observations.bufferTime(this.options.lifeSpan);
        const count: Observable<DataType[]> = observations.bufferCount(this.options.interactions);
        const timeCount: Observable<DataType[]> = time.race(count);

        return timeCount
            .map((data: DataType[]) => this.evaluate(data, this.genotype, this.phenotype))
            .take(1);
    }
}
