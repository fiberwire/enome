import { Observable, Observer, ReplaySubject, Subject, Subscription } from "rxjs";

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

        return state
            .take(this.options.interactions)
            .map(async (s) => { // perceive, interact, and observe
                const perception = await this.perceiveEnvironment(s);
                const interaction = await this.interactWithPerception(perception);
                const observation = await this.observeInteractions(interaction);

                env.next(interaction);

                return observation;
            })
            .bufferCount(this.options.interactions) // buffer observations
            .map((buffer) => Promise.all(buffer)) // resolve promises
            .map(async (o) => { // evaluate
                const evaluation = await this.evaluateObservations(o);
                try {
                    evaluate.next(evaluation);
                } catch (e) {
                    console.log(e.stack);
                }

        })
            .subscribe();
    }

    // turn env state into perception of env state
    // perception is just the information that is relevant to this particular organism
    // if it's a simple simulation, you would probably just set AState to be of the same
    // type as EState and return it in this.perceive()
    private async perceiveEnvironment(
        state: IStateUpdate<EState>,
    ): Promise<IStateUpdate<AState>> {
        return Promise
            .resolve(state)
            .then((s) => this.perceive(s));
    }

    // turn perception of env state into state that has been interacted with
    private async interactWithPerception(state: IStateUpdate<AState>): Promise<IAgentUpdate<EState>> {
        return Promise
            .resolve(state)
            .then((s) => this.interact(s, this.phenotype))
            .then((i) => ({ ...i, agentID: this.genotype.id }));
    }

    // collects data from interactions with state
    private async observeInteractions(interactions: IStateUpdate<EState>): Promise<Data> {
        return Promise
            .resolve(interactions)
            .then((i) => this.observe(i));
    }

    private async evaluateObservations(observations: Promise<Data[]>): Promise<IEvaluation<Gen, Data, Pheno>> {
        return observations
            .then((o) => this.evaluate(o, this.genotype, this.phenotype));
    }
}
