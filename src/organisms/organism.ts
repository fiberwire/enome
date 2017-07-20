import { Observable, Observer, Subject, Subscription } from "rxjs";

import * as _ from "lodash";
import { IScheduler, Scheduler } from "rxjs/Scheduler";
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
    OrgOptions extends IOrganismOptions,
    DataType, PhenoType, EnvStateType> {
    public phenotype: PhenoType;

    constructor(public genotype: Genome<GenType>,
                public options: OrgOptions) {
        this.phenotype = this.createPhenotype(this.genotype);
    }

    public abstract observe(interaction: IStateUpdate<EnvStateType>): DataType;

    public abstract interact(
        state: IStateUpdate<EnvStateType>, phenotype: PhenoType): IStateUpdate<EnvStateType>;

    public abstract evaluate(
        data: DataType[], genotype: Genome<GenType>, phenotype: PhenoType): IEvaluation<GenType, DataType, PhenoType>;

    public abstract createPhenotype(genome: Genome<GenType>): PhenoType;

    public interactWithEnvironment(
        state: Observable<IStateUpdate<EnvStateType>>,
        env: Observer<IStateUpdate<EnvStateType>>,
        evaluate: Observer<IEvaluation<GenType, DataType, PhenoType>>): Subscription {
        const interactions = this.interactWithState(state);
        const observations = this.observeInteractions(interactions);
        const evaluations = this.evaluateObservations(observations);

        return [
            interactions.subscribe(env), // send interactions to environment
            evaluations.subscribe(evaluate), // send evaluations to population
        ].reduce((sub, s) => sub.add(s));
    }

    private interactWithState(state: Observable<IStateUpdate<EnvStateType>>): Observable<IStateUpdate<EnvStateType>> {
        return state
            .map((s) => this.interact(s, this.phenotype));
    }

    // adds observations to this.data
    private observeInteractions(interactions: Observable<IStateUpdate<EnvStateType>>): Observable<DataType> {
        return interactions
            .map((s) => this.observe(s));
    }

    private evaluateObservations(
        observations: Observable<DataType>,
    ): Observable<IEvaluation<GenType, DataType, PhenoType>> {
        const time: Observable<DataType[]> = observations.bufferTime(this.options.lifeSpan);
        const count: Observable<DataType[]> = observations.bufferCount(this.options.interactions);
        const timeCount: Observable<DataType[]> = time.race(count);

        return timeCount
            .map((data: DataType[]) => this.evaluate(data, this.genotype, this.phenotype))
            .take(1);
    }
}
