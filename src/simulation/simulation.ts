import { FitnessObjective } from "../enums/fitness-objective";
import { Observable } from "rxjs/Observable";
import { ReplaySubject, Subject } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import {
    Environment, IEvaluation, IGenomeOptions, IOrganismOptions,
    IPopulationOptions, Organism, Population,
    ReactiveCollection, ReactiveProperty,
} from "../index";

import * as _ from "lodash";

export class Simulation<Gen extends IGenomeOptions,
    Pop extends IPopulationOptions,
    Org extends IOrganismOptions,
    Data, Pheno, AState, EState> {

    public best: ReactiveProperty<IEvaluation<Gen, Data, Pheno>>
    = new ReactiveProperty();

    public top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>
    = new ReactiveCollection();

    public avgFitness: ReactiveProperty<number> = new ReactiveProperty();

    public newOrganisms: ReplaySubject<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>
    = new ReplaySubject<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>(1);

    private subs: Subscription = new Subscription();

    constructor(
        public population: Population<Gen, Pop, Org, Data, Pheno, AState, EState>,
        public environment: Environment<Gen, Pop, Org, Data, Pheno, AState, EState>,
    ) { }

    public start(): Simulation<Gen, Pop, Org, Data, Pheno, AState, EState> {

        this.subs = new Subscription()
            .add(this.introduceOrganisms())
            .add(this.updateAvgFitness())
            .add(this.updateTop())
            .add(this.updateBest())
            .add(this.population.populate(this.newOrganisms, this.top));

        return this;
    }

    private updateBest(): Subscription {
        const update = this.population.evaluations
            .filter((e) => e != null && e !== undefined)
            .subscribe((evaluation) => {
                if (this.best.value === undefined || this.best.value == null) {
                    this.best.value = evaluation;
                }

                switch (this.population.popOptions.objective) {
                    case FitnessObjective.minimize:
                        if (evaluation.fitness < this.best.value.fitness) {
                            this.best.value = evaluation;
                        }
                        break;

                    case FitnessObjective.maximize:
                        if (evaluation.fitness > this.best.value.fitness) {
                            this.best.value = evaluation;
                        }
                        break;
                }
            },
            (error) => console.log(`error from simulation.updateBest: ${error}`),
            () => console.log("simulation complete"),
        );

        return update;
    }

    private updateTop(): Subscription {
        const update = this.population.evaluations
            .filter((e) => e != null && e !== undefined)
            .subscribe((e) => {
                const top = this.top.value;
                top.push(e);
                const sorted = _.sortBy(top, (t) => t.fitness);
                const taken = _.take(sorted, this.population.popOptions.size * this.population.popOptions.topPercent);
                this.top.value = taken;
            },
            (error) => console.log(`error from simulation.updateTop: ${error}`));

        return update;
    }

    private updateAvgFitness(): Subscription {
        return this.population.evaluations
            .filter((e) => e != null && e !== undefined)
            .subscribe((e) => {
                this.avgFitness.value = (this.avgFitness.value + e.fitness) / 2;
            },
            (error) => console.log(`error from simulation.updateAvgFitness: ${error}`));
    }

    private introduceOrganisms(): Subscription {
        const intro = this.newOrganisms
            .subscribe((org) => {
                this.subs.add(org.interactWithEnvironment(
                    this.environment.state.asObservable(),
                    this.environment.state.asObserver(),
                    this.population.evaluations));
            },
            (error) => console.log(`error from simulation.introduceOrganism: ${error}`));

        return intro;
    }
}
