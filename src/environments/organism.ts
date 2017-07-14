import { IDisposable, Observable, Subject } from "rx";
import { Environment } from "./environment";

import * as _ from "lodash";
import { IGenomeOptions } from "../options/genome-options";
import { ReactiveProperty } from "../reactive-property";

export abstract class Organism<GenType extends IGenomeOptions, DataType, PhenoType, EnvStateType> {

    public data: ReactiveProperty<DataType[]>;
    public env: ReactiveProperty<Environment<GenType, DataType, PhenoType, EnvStateType>>;

    private interactions: Observable<EnvStateType>;
    private observations: Observable<DataType>;
    private envConnection: IDisposable;
    private update: Subject<EnvStateType>;

    constructor(public pop: Population,
                private iterations: number = 1000,
                private duration: number = 30,
                private frameRate: number = 10) {

        this.update = new Subject();
        this.data = new ReactiveProperty();
        this.env = new ReactiveProperty();

        this.connectToEnvironment();
        this.interactWithEnvironment();
        this.recordData();
        this.sendData();
    }

    public abstract observe(env: EnvStateType): DataType;

    public abstract interact(env: EnvStateType): EnvStateType;

    private connectToEnvironment() {
        this.env.subscribe((env) => {
            this.envConnection = env.state
                .throttleWithTimeout(1 / this.frameRate)
                .subscribe(this.update);

            this.env.value = env;
            this.env.value.newConnections.onNext(this.envConnection);
        });
    }

    private interactWithEnvironment() {
        this.interactions = this.update
            .select(this.interact)
            .do((state) => this.env.value.state.value = state);
    }

    // buffers recorded data frames based on duration or iterations
    // then sends it to this.data
    private recordData() {
        this.observations = this.interactions
            .select(this.observe);
    }

    // sends data to the environment for evaluation
    private sendData() {
        this.observations
            .bufferWithTimeOrCount(this.duration, this.iterations)
            .subscribe((data) => this.env.value.doneRecording.onNext(this));
    }
}
