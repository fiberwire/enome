import { Observable, Subject, Subscription } from "rxjs";
import {
    IAgentUpdate,
    IEnvironmentOptions,
    IGenomeOptions,
    IOrganismOptions,
    IPopulationOptions,
    IStateUpdate,
    Organism,
    Population,
    ReactiveCollection,
    ReactiveProperty,
    UpdateType,
} from "../index";

import * as _ from "lodash";
import * as Rx from "rxjs";

export abstract class Environment<
    Gen extends IGenomeOptions,
    Pop extends IPopulationOptions,
    Org extends IOrganismOptions,
    Data, Pheno, AState, EState>{

    public state: ReactiveProperty<IStateUpdate<EState>>;

    public incomingInteractions: Subject<IAgentUpdate<EState>> =
    new Subject<IAgentUpdate<EState>>();

    public get interactions(): Observable<IAgentUpdate<EState>> {
        switch (this.options.updateType) {
            case UpdateType.assign:
                return this.assignedInteractions;

            case UpdateType.random:
            default: // if updateType is not specified, use random
                return this.randomInteractions;
        }
    }

    public history: ReactiveCollection<IStateUpdate<EState>>;

    private subs: Subscription = new Subscription();

    constructor(public options: IEnvironmentOptions) {
        this.state = new ReactiveProperty<IStateUpdate<EState>>(this.initialState);

        // record history if historyLength is set
        if (this.options.historyLength) {
            this.history = new ReactiveCollection();
            this.subs.add(this.recordHistory());
        }

        this.subs.add(this.interaction());
    }

    // The beginning state of the Environment
    public abstract get initialState(): IStateUpdate<EState>

    public get bufferedInteractions(): Observable<Array<IAgentUpdate<EState>>> {
        const rate = this.options.interactionRate || 1000; // default to 1000 if interaction rate isn't specified

        return this.incomingInteractions
            .filter((i) => i.interaction > this.state.value.interaction) // only accept new interactions
            .bufferTime(1000 / rate) // buffer new interactions periodically
            .filter((interactions) => interactions.length > 0); // do notihng if there are no interactions
    }

    public get randomInteractions(): Observable<IAgentUpdate<EState>> {
        return this.bufferedInteractions
            .map((interactions) => {
                const i = _.shuffle(interactions)[0];
                return i;
            }); // choose a random interaction from buffer
    }

    public get assignedInteractions(): Observable<IAgentUpdate<EState>> {
        return this.bufferedInteractions
            .map((i) => {
                return i.reduceRight((prev, curr) => {
                    return Object.assign(prev, curr);
                });
            });
    }

    // resets the environment back to a fresh state
    public reset(): void {
        this.state.value = this.initialState;
    }

    // choose a random interaction to use as this.state
    private interaction(): Subscription {
        return this.interactions
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap)
            .subscribe((i) => {
                this.state.value = i;
            },
            (error) => console.log(`error in environment.interaction: ${error}`),
            () => console.log(`environment completed interaction`));
    }

    private recordHistory(): Subscription {
        return this.state.subscribe((s) => {
            this.history.push(s);

            if (this.history.value.length > this.options.historyLength) {
                this.history.value = _.takeRight(this.history.value, this.options.historyLength);
            }
        });
    }
}
