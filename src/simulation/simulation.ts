import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import {
    Environment, IEvaluation, IGenomeOptions,
    IOrganismOptions, IPopulationOptions, Population,
    ReactiveCollection, ReactiveProperty,
} from "../index";

import * as _ from "lodash";

export class Simulation<GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    OrgType extends IOrganismOptions,
    DataType, PhenoType, AgentStateType, EnvStateType> {

    public best: ReactiveCollection<IEvaluation<GenType, DataType, PhenoType>>
    = new ReactiveCollection();

    public top: ReactiveCollection<IEvaluation<GenType, DataType, PhenoType>>
    = new ReactiveCollection();

    private sub: Subscription = new Subscription();

    constructor(
        public populations:
            Array<Population<GenType, PopType, OrgType, DataType, PhenoType, AgentStateType, EnvStateType>>,
        public environments: Array<Environment<EnvStateType>>,
    ) { }

    public start(): void {
        this.populations
            .forEach((pop) => {
                this.sub.add(pop.populate(this.environments));
            });

        this.sub.add(this.updateBest());
        this.sub.add(this.updateTop());
    }

    public updateBest(): Subscription {
        const sub = new Subscription();
        const bests = new Subject<ReactiveProperty<IEvaluation<GenType, DataType, PhenoType>>>();

        // for each best, subscribe to it, add value to this.best
        sub.add(bests.subscribe((best) => {
            sub.add(best.subscribe((b) => { // when any population's best receives a new value
                const value = this.best.value;
                value.push(b);
                const sorted = _.sortBy(value, (e) => e.fitness); // sort by fitness
                const taken = _.take(sorted, this.populations.length); // take the same amount of bests as populations
                this.best.value = taken;
            }));
        }));

        // aad best reactive property from each populations to bests
        this.populations
            .map((pop) => pop.best)
            .forEach((best) => {
                bests.next(best);
            });

        return sub;
    }

    public updateTop(): Subscription {
        const sub = new Subscription();

        const tops = this.populations
            .map((pop) => pop.top.asObservable())
            .reduce((prev, curr) => prev.zip(curr));

        this.top.value = tops;

        return sub;
    }
}
