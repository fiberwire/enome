import { Subject } from "rx";
import { ReactiveProperty } from "../reactive-property";
import { Organism } from "./organism";

export abstract class Environment<EnvStateType, T, U, V>{
    public state: ReactiveProperty<EnvStateType>;
    public organisms: Array<Organism<T, U, V, EnvStateType>>;

    public entry: Subject<Organism<T, U, V, EnvStateType>>;

    abstract get initialState(): EnvStateType

    constructor() {
        //
    }

    private connectOrganisms() {
        this.entry.subscribe((org) => {

        });
    }
}
