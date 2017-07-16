import { IDisposable, Observable, Subject } from "rx";
import { IEvaluation } from "../interfaces/evaluation";
import { IGenomeOptions } from "../options/genome-options";
import { IPopulationOptions } from "../options/population-options";
import { ReactiveProperty } from "../reactive-property";
import { Organism } from "./organism";
import { Population } from "./population";

import * as _ from "lodash";

export abstract class Environment<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType>{
    public state: ReactiveProperty<EnvStateType>;

    public newOrganisms: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public newConnections: Subject<IDisposable>;

    public pop: Population<GenType, PopType, DataType, PhenoType, EnvStateType>;

    private subs: IDisposable[];

    constructor() {
        this.resetState();
        this.subs = [
            this.initializeOrganisms(this.pop.popOptions.size),
        ];

    }

    // The beginning state of the Environment
    public abstract get initialState(): EnvStateType

    // create an organism to inject into environment.
    public abstract createOrganism(): Organism<GenType, PopType, DataType, PhenoType, EnvStateType>;

    // resets the environment back to a fresh state
    public reset(): void {
        this.resetState();
        this.killOrganisms();
        this.initializeOrganisms(this.pop.popOptions.size);
    }

    // disposes all subscriptions
    public dispose(): void {
        this.subs.forEach((s) => s.dispose());
    }

    // initializes organisms and adds them to the environment
    private initializeOrganisms(n: number): IDisposable {
        return Observable
            .range(0, n)
            .select(this.createOrganism)
            .do((org) => this.pop.organisms.push(org))
            .subscribe(this.newOrganisms);
    }

    private killOrganisms(): void {
        this.pop.organisms = _.compact(this.pop.organisms);

        for (let i = 0; i < this.pop.organisms.length; i++) {
            this.pop.organisms[i].dispose();
            this.pop.organisms[i] = null;
        }

        this.pop.organisms = [];
    }

    private resetState(): void {
        this.state.value = this.initialState;
    }
}
