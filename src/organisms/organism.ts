import { Observable, Subject, Subscription } from "rxjs";

import * as _ from "lodash";
import {
    Environment,
    Genome,
    IEvaluation,
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

    private subs: Subscription = new Subscription();

    // creates a new environment state by interacting with it
    // then updates environment state with the mutated state
    private interactions: Subject<IStateUpdate<EnvStateType>> = new Subject();

    private interaction: ReactiveProperty<number> = new ReactiveProperty<number>(0);

    // collects data from the environment state
    private get observations(): Observable<DataType> {
        return this.interactions
            .map(this.observe);
    }

    constructor(toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>,
                state: Observable<IStateUpdate<EnvStateType>>,
                env: Subject<IStateUpdate<EnvStateType>>,
                genome: Genome<GenType>,
                public options: IOrganismOptions) {
        this.genotype = new ReactiveProperty(genome);
        this.phenotype = this.createPhenotype(this.genotype.value);
        this.data = new ReactiveCollection<DataType>();

        this.subs.add(this.interactWithState(state));
        this.subs.add(this.interactWithEnvironment(env));
        this.subs.add(this.collectData());
        this.subs.add(this.queueForEvaluation(toEvaluate));

    }

    public abstract observe(interaction: IStateUpdate<EnvStateType>): DataType;

    public abstract interact(state: IStateUpdate<EnvStateType>, phenotype: PhenoType):
        IStateUpdate<EnvStateType>;

    public abstract createPhenotype(genome: Genome<GenType>): PhenoType;

    public unsubscribe() {
        this.subs.unsubscribe();
    }

    private interactWithEnvironment(
        env: Subject<IStateUpdate<EnvStateType>>,
    ): Subscription {
        return this.interactions
            .subscribe((i) => {
                env.next(i);
            });
    }

    private interactWithState(state: Observable<IStateUpdate<EnvStateType>>): Subscription {
        return state
            .map((s) => this.interact(s, this.phenotype))
            .do((i) => this.interaction.value += 1)
            .subscribe((i) => {
                this.interactions.next(i);
            });
    }

    // adds observations to this.data
    private collectData(): Subscription {
        return this.observations
            .subscribe((o) => this.data.push(o));
    }

    // buffers collected data based on lifespan or iterations
    // queues self for evaluation by Population
    private queueForEvaluation(
        toEvaluate: Subject<Organism<GenType, PopType, DataType, PhenoType, EnvStateType>>): Subscription {
        return this.data
            .bufferTimeCount(this.options.lifeSpan, this.options.interactions)
            .subscribe((data) => toEvaluate.next(this));
    }
}
