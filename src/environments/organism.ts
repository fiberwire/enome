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
    public genotype: ReactiveProperty<Genome<GenType>>;
    public phenotype: ReactiveProperty<PhenoType>;

    private subs: IDisposable[] = [];

    // updates to env.state throttled by interactionRate
    // (should stop the number of state updates from getting out of hand)
    private get update(): Observable<EnvStateType>{
        return this.env.state
                .throttleWithTimeout(1 / this.interactionRate);
    }

    // creates a new environment state by interacting with it
    // then updates environment state with the mutated state
    private get interactions(): Observable<EnvStateType> {
        return this.update
            .select((state) => this.interact(state, this.phenotype.value))
            .do((state) => this.env.state.value = state);
    }

    // collects data from the environment state
    private get observations(): Observable<DataType> {
        return this.interactions
            .select(this.observe);
    }

    constructor(public pop: Population<GenType, PopType, DataType, PhenoType, EnvStateType>,
                public env: Environment<GenType, PopType, DataType, PhenoType, EnvStateType>,
                genome: Genome<GenType>,
                private iterations: number = 1000,
                private duration: number = 30,
                private interactionRate: number = 10) {
        this.genotype = new ReactiveProperty(genome);
        this.data = new ReactiveProperty<DataType[]>([]);

        this.subs = [
            this.updatePhenotype(),
            this.reset(),
            this.queueForEvaluation(),
        ];
    }

    public abstract observe(env: EnvStateType): DataType;

    public abstract interact(env: EnvStateType, phenotype: PhenoType): EnvStateType;

    public abstract createPhenotype(genome: Genome<GenType>): PhenoType;

    public dispose() {
        this.subs.forEach((s) => s.dispose());
    }

    private updatePhenotype(): IDisposable {
        return this.genotype
            .map(this.createPhenotype)
            .subscribe((phenotype) => this.phenotype.value = phenotype);
    }

    private reset(): IDisposable {
        return this.phenotype
            .subscribe((phenotype) => {
                this.data.value = null;
            });
    }

    // buffers collected data frames based on duration or iterations
    // queues self for evaluation by Population
    private queueForEvaluation(): IDisposable {
        return this.observations
            .bufferWithTimeOrCount(this.duration, this.iterations)
            .do((data) => this.data.value = data)
            .subscribe((data) => this.pop.toEvaluate.onNext(this));
    }
}
