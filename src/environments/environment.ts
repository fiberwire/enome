import { IDisposable, Subject } from "rx";
import { IEvaluation } from "../interfaces/evaluation";
import { IGenomeOptions } from "../options/genome-options";
import { IPopulationOptions } from "../options/population-options";
import { ReactiveProperty } from "../reactive-property";
import { Organism } from "./organism";

import * as _ from "lodash";

export abstract class Environment<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType>{
    public state: ReactiveProperty<EnvStateType>;
    public organisms: Array<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public connections: IDisposable[];

    public newOrganisms: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public newConnections: Subject<IDisposable>;
    public toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>;

    constructor() {
        this.connectOrganisms();
    }

    public abstract get initialState(): EnvStateType

    private connectOrganisms() {
        this.newConnections.subscribe((con) => {
            this.connections.push(con);
            this.connections = _.compact(this.connections); // remove closed connections
        });

        this.newOrganisms.subscribe((org) => {
            org.env.value = this;
            this.organisms.push(org);
            this.organisms = _.compact(this.organisms);
        });
    }

    private disconnectAll() {
        for (const con of this.connections) {
            con.dispose();
        }
    }
}
