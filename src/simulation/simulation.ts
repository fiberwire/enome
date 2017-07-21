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
        Array<Population<GenType, PopType, OrgType, DataType, PhenoType, AgentStateType, EnvStateType>>,
        public environments: Array<Environment<EnvStateType>>,
    ) {}

    public start(): Subscription {
        const subs = new Subscription();

        this.populations.forEach((pop) => {
            subs.add(pop.populate(this.environments));
        });

        return subs;
    }
}
