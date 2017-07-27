import { Observable, Observer, Subject, Subscription } from "rxjs";

import * as _ from "lodash";
import * as Rx from "rxjs";
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
    Gen extends IGenomeOptions,
    Pop extends IPopulationOptions,
    Org extends IOrganismOptions,
    Data, Pheno, AState, EState> {
    public phenotype: Pheno;

    constructor(public genotype: Genome<Gen>,
                public options: Org) {
        this.phenotype = this.createPhenotype(this.genotype);
    }

    public abstract perceive(state: IStateUpdate<EState>): IStateUpdate<AState>;

    public abstract interact(
        state: IStateUpdate<AState>, phenotype: Pheno): IStateUpdate<EState>;

    public abstract observe(interaction: IStateUpdate<EState>): Data;

    public abstract evaluate(
        data: Data[], genotype: Genome<Gen>, phenotype: Pheno): IEvaluation<Gen, Data, Pheno>;

    public abstract createPhenotype(genome: Genome<Gen>): Pheno;

    // perceive environment
    // interact with environment state
    // observe interactions
    // evaluate observations
    public interactWithEnvironment(
        state: Observable<IStateUpdate<EState>>,
        env: Observer<IStateUpdate<EState>>,
        evaluate: Observer<IEvaluation<Gen, Data, Pheno>>): Subscription {

        const subs: Subscription = new Subscription();

        const perception = this.perceiveEnvironment(state);
        const interactions = this.interactWithState(perception);
        const observations = this.observeInteractions(interactions);
        const evaluations = this.evaluateObservations(observations);

        // console.log(`interacting with environment: ${this.genotype.id}`);

        // send evaluations to population
        subs.add(evaluations.subscribe((e) => {
            evaluate.next(e);
            console.log(`sent evaluation to population: ${this.genotype.id}`);
            subs.unsubscribe();
        },
        (error) => console.log(`${error}`)));

        // send interactions to environment
        subs.add(interactions.subscribe((i) => {
            env.next(i);
            console.log(`sent interaction to env: ${this.genotype.id}`);
        },
        (error) => console.log(`${error}`)));

        return subs;
    }

    // turn env state into perception of env state
    // perception is just the information that is relevant to this particular organism
    // if it's a simple simulation, you would probably just set AState to be of the same
    // type as EState and return it in this.perceive()
    private perceiveEnvironment(
        state: Observable<IStateUpdate<EState>>,
    ): Observable<IStateUpdate<AState>> {
        return state
            .map((s) => {
                return this.perceive(s);
            })
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap);
    }

    // turn perception of env state into state that has been interacted with
    private interactWithState(state: Observable<IStateUpdate<AState>>): Observable<IAgentUpdate<EState>> {
        return state
            .map((s) => {
                return this.interact(s, this.phenotype);
            })
            .map((i) => {
                // add agentID to interaction
                return { ...i, agentID: this.genotype.id };
            })
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap);
    }

    // collects data from interactions with state
    private observeInteractions(interactions: Observable<IStateUpdate<EState>>): Observable<Data> {
        return interactions
            .map((i) => {
                return this.observe(i);
            })
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap);
    }

    private evaluateObservations(
        observations: Observable<Data>,
    ): Observable<IEvaluation<Gen, Data, Pheno>> {
        // const time: Observable<Data[]> = observations.bufferTime(this.options.lifeSpan);
        const count: Observable<Data[]> = observations.bufferCount(this.options.interactions);
        // const timeCount: Observable<Data[]> = time.race<Data[]>(count);

        return count
            .map((data) => {
                return this.evaluate(data, this.genotype, this.phenotype);
            })
            .take(1)
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap);
    }
}
