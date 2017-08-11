import { Observable, Observer, Subject, Subscription } from "rxjs";
import * as Rx from "rxjs";
import { mutate } from "../index";

import {
    cloneEvaluation,
    cloneOrganism,
    Environment,
    FitnessObjective,
    Gene,
    Genome,
    IEvaluation,
    IGenomeOptions,
    IOrganismOptions,
    IPopulationOptions,
    Organism,
    ReactiveCollection,
    ReactiveProperty,
    reproduceManyToOne,
    value,
} from "../index";

import * as Chance from "chance";
import * as _ from "lodash";
const chance = new Chance();

export abstract class Population<
    Gen extends IGenomeOptions,
    Pop extends IPopulationOptions,
    Org extends IOrganismOptions,
    Data, Pheno, AState, EState> {

    public avgFitness: ReactiveProperty<number> = new ReactiveProperty<number>();

    public evaluations: Subject<IEvaluation<Gen, Data, Pheno>> =
    new Subject<IEvaluation<Gen, Data, Pheno>>();

    private subs: Subscription = new Subscription();

    private generation: number = 0;

    constructor(
        public genOptions: Gen,
        public popOptions: Pop,
        public orgOptions: Org,
    ) {
    }

    // mutate the organism based on evaluation
    public mutate(
        evaluation: IEvaluation<Gen, Data, Pheno>,
    ): Genome<Gen> {
        switch (this.popOptions.objective) {
            case FitnessObjective.minimize:
                if (evaluation.fitness <= this.avgFitness.value) { // better than average
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                } else { // worse than average
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance,
                        this.popOptions.mutate.mutateOp,
                    );
                }

            default:
            case FitnessObjective.maximize:
                if (evaluation.fitness >= this.avgFitness.value) { // better than average
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance * .5,
                        this.popOptions.mutate.mutateOp,
                    );
                } else { // worse than average
                    return mutate(
                        evaluation.genotype,
                        this.popOptions.mutate.mutateChance,
                        this.popOptions.mutate.mutateOp,
                    );
                }
        }
    }

    // create an organism to inject into environment.
    public abstract createOrganism(
        genome: Genome<Gen>,
        options: IOrganismOptions,
    ): Organism<Gen, Pop, Org, Data, Pheno, AState, EState>;

    public createOrganisms(n: number): Array<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>> {
        return _.range(n)
            .map((i) => this.createOrganism(new Genome(this.genOptions), this.orgOptions));
    }

    // spawns and evenly distributes organisms across all envs
    public populate(
        organisms: Observer<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    ): Subscription {
        const orgs = this.createOrganisms(this.popOptions.size);

        for (const o of orgs) {
            organisms.next(o);
        }

        return this
            .updateGenotype(this.evaluations, top)
            .map((genome) => this.createOrganism(genome, this.orgOptions))
            .take(this.popOptions.generations)
            .do((g) => this.generation++)
            .do((g) => {
                if (this.popOptions.progress) {
                    if (this.generation % _.round((this.popOptions.generations / 10)) === 0) {
                        console.log(
                            `Generation: ${this.generation} ${_.round(this.generation * 100 / this.popOptions.generations)}%`,
                        );
                    }
                }
            })
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap)
            .subscribe(
            (o) => organisms.next(o),
            (error) => console.log(`population.populate(): ${error.stack}`),
            () => console.log(`Evolution completed after ${this.generation++} generations.`),
        );
    }

    // update genotypes as they are evaluated
    private updateGenotype(
        evaluations: Observable<IEvaluation<Gen, Data, Pheno>>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>): Observable<Genome<Gen>> {

        return evaluations
            .map((e) => {
                const update = chance.weighted(
                    ["mutate", "reproduce", "randomize", "keep"],
                    [
                        this.popOptions.weights.mutate,
                        this.popOptions.weights.reproduce,
                        this.popOptions.weights.randomize,
                        this.popOptions.weights.keep,
                    ],
                );

                switch (update) {
                    case "mutate":
                        return this.mutateGenotype(e, top);

                    case "reproduce":
                        return this.reproduceGenotype(e, top);

                    case "randomize":
                        return this.randomizeGenotype(e, top);

                    case "keep":
                    default:
                        return e.genotype;
                }
            });
    }

    private mutateGenotype(
        evaluation: IEvaluation<Gen, Data, Pheno>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    ): Genome<Gen> {
        return this.mutate(evaluation);
    }

    private reproduceGenotype(
        evaluation: IEvaluation<Gen, Data, Pheno>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    ): Genome<Gen> {
        if (top.value.length > 0 && top.value != null && top.value !== undefined) {
            return reproduceManyToOne(top.value.map((t) => t.genotype));
        } else {
            return this.mutate(evaluation);
        }

    }

    private randomizeGenotype(
        evaluation: IEvaluation<Gen, Data, Pheno>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    ): Genome<Gen> {
        return new Genome(this.genOptions);
    }
}
