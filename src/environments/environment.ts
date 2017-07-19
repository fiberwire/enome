import { Observable, Subject, Subscription } from "rxjs";
import {
    IEnvironmentOptions,
    IGenomeOptions,
    IPopulationOptions,
    IStateUpdate,
    Organism,
    Population,
    ReactiveProperty,
} from "../index";

import * as _ from "lodash";

export abstract class Environment<EnvStateType>{

    public state: ReactiveProperty<IStateUpdate<EnvStateType>>;

    public interactions: Subject<IStateUpdate<EnvStateType>>;

    private subs: Subscription = new Subscription();

    constructor(public options: IEnvironmentOptions) {
        this.interactions = new Subject<IStateUpdate<EnvStateType>>();

        this.state = new ReactiveProperty<IStateUpdate<EnvStateType>>(this.initialState);

        this.subs.add(this.interaction());
    }

    // The beginning state of the Environment
    public abstract get initialState(): IStateUpdate<EnvStateType>

    // resets the environment back to a fresh state
    public reset(): void {
        this.state.value = this.initialState;
    }

    // choose a random interaction to use as this.state
    private interaction(): Subscription {
        return this.interactions
            .filter((i) => i.interaction > this.state.value.interaction) // only accept new interactions
            .bufferTime(1 / this.options.interactionRate) // buffer new interactions periodically
            .map((interactions) => _.shuffle(interactions)[0]) // choose a random interaction from buffer
            .subscribe((i) => {
                this.state.value = i;
            });
    }
}
