import { Observable, Subject, Subscription } from "rxjs";
import {
    IAgentUpdate,
    IEnvironmentOptions,
    IGenomeOptions,
    IPopulationOptions,
    IStateUpdate,
    Organism,
    Population,
    ReactiveProperty,
} from "../index";

import * as _ from "lodash";

export abstract class Environment<StateType>{

    public state: ReactiveProperty<IStateUpdate<StateType>>;

    public interactions: Subject<IAgentUpdate<StateType>> =
    new Subject<IAgentUpdate<StateType>>();

    private subs: Subscription = new Subscription();

    constructor(public options: IEnvironmentOptions) {
        this.state = new ReactiveProperty<IStateUpdate<StateType>>(this.initialState);

        this.subs.add(this.interaction());
    }

    // The beginning state of the Environment
    public abstract get initialState(): IStateUpdate<StateType>

    // resets the environment back to a fresh state
    public reset(): void {
        this.state.value = this.initialState;
    }

    // choose a random interaction to use as this.state
    private interaction(): Subscription {
        return this.interactions.asObservable()
            .filter((i) => i.interaction > this.state.value.interaction) // only accept new interactions
            .filter((i) => i.interaction !== undefined)
            .bufferTime(1 / this.options.interactionRate) // buffer new interactions periodically
            .map((interactions) => _.shuffle(interactions)[0]) // choose a random interaction from buffer
            .subscribe((i) => {
                this.state.value = i;
            });
    }
}
