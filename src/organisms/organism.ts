import { IDisposable, Observable, Subject } from "rx";

import * as _ from "lodash";
import {
    Environment,
    Genome,
    IGenomeOptions,
    IOrganismOptions,
    IPopulationOptions,
    IStateUpdate,
    Population,
    ReactiveCollection,
    ReactiveProperty,
} from "../index";

export abstract class Organism<
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    DataType, PhenoType, EnvStateType> {
    public data: ReactiveCollection<DataType>;
    public genotype: ReactiveProperty<Genome<GenType>>;
    public phenotype: PhenoType;

    private subs: IDisposable[] = [];

    // creates a new environment state by interacting with it
    // then updates environment state with the mutated state
    private get interactions(): Observable<IStateUpdate<EnvStateType>> {
        return this.env.state
            .map((state) => this.interact(state, this.phenotype));
    }

    // collects data from the environment state
    private get observations(): Observable<DataType> {
        return this.interactions
            .select(this.observe);
    }

    constructor(public pop: Population<GenType, PopType, DataType, PhenoType, EnvStateType>,
                public env: Environment<EnvStateType>,
                genome: Genome<GenType>,
                public options: IOrganismOptions) {
        this.genotype = new ReactiveProperty(genome);
        this.phenotype = this.createPhenotype(this.genotype.value);
        this.data = new ReactiveCollection<DataType>();

        this.subs = [
            this.interactWithEnvironment(env),
            this.collectData(),
            this.queueForEvaluation(),
        ];
    }

    public abstract observe(interaction: IStateUpdate<EnvStateType>): DataType;

    public abstract interact(state: IStateUpdate<EnvStateType>, phenotype: PhenoType):
        IStateUpdate<EnvStateType>;

    public abstract createPhenotype(genome: Genome<GenType>): PhenoType;

    public dispose() {
        this.subs.forEach((s) => s.dispose());
    }

    private interactWithEnvironment(env: Environment<EnvStateType>): IDisposable {
        return this.interactions
            .subscribe(this.env.interactions);
    }

    // adds observations to this.data
    private collectData(): IDisposable {
        return this.observations
            .subscribe((o) => this.data.push(o));
    }

    // buffers collected data based on lifespan or iterations
    // queues self for evaluation by Population
    private queueForEvaluation(): IDisposable {
        return this.data
            .bufferWithTimeOrCount(this.options.lifeSpan, this.options.interactions)
            .subscribe((data) => this.pop.toEvaluate.onNext(this));
    }
}
