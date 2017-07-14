import { IDisposable, Observable, Subject } from "rx";
import { Environment } from "./environment";

import * as _ from "lodash";
import { Population } from "../environments/population";
import { Genome } from "../genotypes/genome";
import { IGenomeOptions } from "../options/genome-options";
import { IPopulationOptions } from "../options/population-options";
import { ReactiveProperty } from "../reactive-property";

export abstract class Organism<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {

    public data: ReactiveProperty<DataType[]>;
    public env: ReactiveProperty<Environment<GenType, PopType, DataType, PhenoType, EnvStateType>>;
    public genotype: ReactiveProperty<Genome<GenType>>;
    public phenotype: ReactiveProperty<PhenoType>;

    private interactions: Observable<EnvStateType>;
    private observations: Observable<DataType>;
    private envConnection: IDisposable;
    private update: Subject<EnvStateType>;

    constructor(public pop: Population<GenType, PopType, DataType, PhenoType, EnvStateType>,
                genome: Genome<GenType>,
                private iterations: number = 1000,
                private duration: number = 30,
                private frameRate: number = 10) {
        this.genotype = new ReactiveProperty(genome);
        this.update = new Subject();
        this.data = new ReactiveProperty();
        this.env = new ReactiveProperty();

        this.connectToEnvironment();
        this.interactWithEnvironment();
        this.collectData();
        this.queueForEvaluation();
    }

    public abstract observe(env: EnvStateType): DataType;

    public abstract interact(env: EnvStateType, phenotype: PhenoType): EnvStateType;

    public abstract createPhenotype(genome: Genome<GenType>): PhenoType;

    private updatePhenotype() {
        this.genotype
            .select(this.createPhenotype)
            .subscribe((phenotype) => this.phenotype.value = phenotype);
    }

    private reset() {
        this.phenotype
            .subscribe((phenotype) => {
                this.data.value = null;
            });
    }

    // begins receives state updates from environment
    private connectToEnvironment() {
        this.env.subscribe((env) => {
            this.envConnection = env.state
                .throttleWithTimeout(1 / this.frameRate)
                .subscribe(this.update);

            this.env.value.newConnections.onNext(this.envConnection);
        });
    }

    // creates a new environment state by interacting with it
    // then updates environment state it interacted state
    private interactWithEnvironment() {
        this.interactions = this.update
            .select((state) => this.interact(state, this.phenotype.value))
            .do((state) => this.env.value.state.value = state);
    }

    // extracts data from the environment state
    private collectData() {
        this.observations = this.interactions
            .select(this.observe);
    }

    // buffers collected data frames based on duration or iterations
    // queues self for evaluation by Population
    private queueForEvaluation() {
        this.observations
            .bufferWithTimeOrCount(this.duration, this.iterations)
            .subscribe((data) => this.pop.toEvaluate.onNext(this));
    }
}
