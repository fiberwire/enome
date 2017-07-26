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

export abstract class Environment<
    Gen extends IGenomeOptions,
    Pop extends IPopulationOptions,
    Org extends IOrganismOptions,
    Data, Pheno, AState, EState>{

    public state: ReactiveProperty<IStateUpdate<EState>>;

    public organisms: ReactiveCollection<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>=
    new ReactiveCollection<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>();

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
            .filter((i) => i.interaction !== undefined)
            .bufferTime(1 / this.options.interactionRate) // buffer new interactions periodically
            .map((interactions) => _.shuffle(interactions)[0]) // choose a random interaction from buffer
            .subscribe((i) => {
                this.state.value = i;
            });
    }
}
