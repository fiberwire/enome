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

    // create an organism to inject into environment.
    public abstract createOrganism(
        genome: Genome<Gen>,
        options: IOrganismOptions,
    ): Organism<Gen, Pop, Org, Data, Pheno, AState, EState>;

    public mutate(
        genome: Genome<Gen>,
    ): Genome<Gen> {
        return mutate(
            genome,
            this.popOptions.mutate.mutateChance,
            this.popOptions.mutate.mutateOp,
        );
    }

    public createOrganisms(n: number): Array<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>> {
        return _.range(n)
            .map((i) => this.createOrganism(new Genome(this.genOptions), this.orgOptions));
    }

    // spawns and evenly distributes organisms across all envs
    public populate(
        organisms: Observer<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
        avgFitness: ReactiveProperty<number>,
    ): Subscription {
        const orgs = this.createOrganisms(this.popOptions.size);

        for (const o of orgs) {
            organisms.next(o);
        }

        return this
            .updateGenotype(this.evaluations, top, avgFitness)
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
    public updateGenotype(
        evaluations: Observable<IEvaluation<Gen, Data, Pheno>>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
        avgFitness: ReactiveProperty<number>): Observable<Genome<Gen>> {

        return evaluations
            .map((e) => {

                // choose whether to reproduce or randomize
                const update = chance.weighted(
                    [
                        this.reproduceGenotype.bind(this),
                        this.randomizeGenotype.bind(this),
                    ],
                    [
                        this.popOptions.updateWeights.reproduce,
                        this.popOptions.updateWeights.randomize,
                    ],
                );

                switch (this.popOptions.objective) {

                    case FitnessObjective.maximize:
                        if (e.fitness > avgFitness.value) { // better than average
                            return e.genotype;
                        } else { // worse than average
                            return update(e, top, avgFitness);
                        }

                    case FitnessObjective.minimize:
                        if (e.fitness < avgFitness.value) { // better than average
                            return e.genotype;
                        } else { // worse than average
                            return update(e, top, avgFitness);
                        }
                }
            });
    }

    private reproduceGenotype(
        evaluation: IEvaluation<Gen, Data, Pheno>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
        avgFitness: ReactiveProperty<number>,
    ): Genome<Gen> {
        if (top.value.length > 0 && top.value != null && top.value !== undefined) {

            // offspring of all top genotypes
            const offspring = reproduceManyToOne(top.value.map((t) => t.genotype));

            // mutate offspring
            const mutantOffspring = this.mutate(offspring);

            return mutantOffspring;
        } else {
            return this.mutate(evaluation.genotype);
        }
    }

    private randomizeGenotype(
        evaluation: IEvaluation<Gen, Data, Pheno>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
        avgFitness: ReactiveProperty<number>,
    ): Genome<Gen> {
        return new Genome(this.genOptions);
    }
}
