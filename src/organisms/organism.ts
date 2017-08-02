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

        const interactions = new Subject<IAgentUpdate<EState>>();
        const evaluations = new Subject<IEvaluation<Gen, Data, Pheno>>();

        const perception = this.perceiveEnvironment(state);
        const observations = this.observeInteractions(interactions);

        const evaluation = this.evaluateObservations(observations).subscribe(
            (e) => evaluations.next(e),
            (error) => console.log(`evaluation: ${error}`),
            () => console.log("evaluation completed"),
        );

        const interaction = this.interactWithState(perception).subscribe(
            (i) => interactions.next(i),
            (error) => console.log(`interaction: ${error}`),
            () => console.log("interaction completed"),
        );

        const sendingInteractions = interactions.subscribe(
            (i) => {
                console.log(`sending interaction to environment. #${i.interaction}: ${i.agentID}`);
                env.next(i);
            },
            (error) => console.log(`sendingInteraction: ${error}`),
            () => console.log("sendingInteractions completed"),
        );

        const sendingEvaluations = evaluations.subscribe(
            (e) => {
                console.log(`sending evaluation to population. ${e.genotype.id}`);
                evaluate.next(e);
            },
            (error) => console.log(`sendingEvaluations: ${error}`),
            () => console.log("sendingEvaluations completed"),
        );

        return subs
            .add(interaction)
            .add(evaluation)
            .add(sendingInteractions)
            .add(sendingEvaluations);
    }

    // turn env state into perception of env state
    // perception is just the information that is relevant to this particular organism
    // if it's a simple simulation, you would probably just set AState to be of the same
    // type as EState and return it in this.perceive()
    private perceiveEnvironment(
        state: Observable<IStateUpdate<EState>>,
    ): Observable<IStateUpdate<AState>> {
        return state
            .take(this.options.interactions)
            .map((s) => {
                return this.perceive(s);
            })
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap);
    }

    // turn perception of env state into state that has been interacted with
    private interactWithState(state: Observable<IStateUpdate<AState>>): Observable<IAgentUpdate<EState>> {
        return state
            .take(this.options.interactions)
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
