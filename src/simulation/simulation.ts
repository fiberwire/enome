import { Subscription } from "rxjs/Subscription";
import {
    Environment, IGenomeOptions, IOrganismOptions, IPopulationOptions, Population, ReactiveCollection,
} from "../index";

export class Simulation<GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    OrgType extends IOrganismOptions,
    DataType, PhenoType, AgentStateType, EnvStateType> {

    constructor(
        public populations:
            ReactiveCollection<
            Population<GenType, PopType, OrgType, DataType, PhenoType, AgentStateType, EnvStateType>>,
        public environments: ReactiveCollection<Environment<EnvStateType>>,
    ) { }

    public start(): Subscription {
        const subs = new Subscription();

        subs.add(
            this.populations
                .asObservable()
                .combineLatest(this.environments)
                .subscribe((pair) => {
                    pair[0].forEach((pop) => {
                        pop.populate(new ReactiveCollection(pair[1]));
                    });
                }));

        return subs;
    }
}
