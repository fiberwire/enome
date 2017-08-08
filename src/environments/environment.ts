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
} from "../index";

import * as _ from "lodash";
import * as Rx from "rxjs";

export abstract class Environment<
    Gen extends IGenomeOptions,
    Pop extends IPopulationOptions,
    Org extends IOrganismOptions,
    Data, Pheno, AState, EState>{

    public state: ReactiveProperty<IStateUpdate<EState>>;

    public interactions: Subject<IAgentUpdate<EState>> =
    new Subject<IAgentUpdate<EState>>();

    private subs: Subscription = new Subscription();

    constructor(public options: IEnvironmentOptions) {
        this.state = new ReactiveProperty<IStateUpdate<EState>>(this.initialState);

        this.subs.add(this.interaction());
    }

    // The beginning state of the Environment
    public abstract get initialState(): IStateUpdate<EState>

    // resets the environment back to a fresh state
    public reset(): void {
        this.state.value = this.initialState;
    }

    // choose a random interaction to use as this.state
    private interaction(): Subscription {
        return this.interactions.asObservable()
            .filter((i) => i.interaction > this.state.value.interaction) // only accept new interactions
            .bufferTime(1000 / this.options.interactionRate) // buffer new interactions periodically
            .filter((interactions) => interactions.length > 0)
            .map((interactions) => {
                const i = _.shuffle(interactions)[0];
                return i;
            }) // choose a random interaction from buffer
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap)
            .subscribe((i) => {
                this.state.value = i;
            },
            (error) => console.log(`error in environment.interaction: ${error}`),
            () => console.log(`environment completed interaction`));
    }
}
