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

        this.subs = [
            this.introduceOrganisms(),
            this.updateAvgFitness(),
            this.updateTop(),
            this.updateBest(),
            this.population.populate(this.newOrganisms, this.top),
        ].reduce((sub, s) => sub.add(s));

        return this;
    }

    private updateBest(): Subscription {
        const update = this.population.evaluations
            .subscribe((evaluation) => {
                if (evaluation.fitness > this.best.value.fitness) {
                    this.best.value = evaluation;
                }
            });

        return update;
    }

    private updateTop(): Subscription {
        const update = this.population.evaluations
            .subscribe((e) => {
                const top = this.top.value;
                top.push(e);
                const sorted = _.sortBy(top, (t) => t.fitness);
                const taken = _.take(sorted, this.population.popOptions.size * this.population.popOptions.topPercent);
                this.top.value = taken;
            });

        return update;
    }

    private updateAvgFitness(): Subscription {
        return this.population.evaluations
            .subscribe((e) => {
                this.avgFitness.value = (this.avgFitness.value + e.fitness) / 2;
            });
    }

    private introduceOrganisms(): Subscription {
        const intro = this.newOrganisms
            .subscribe((org) => {
                this.subs.add(org.interactWithEnvironment(
                    this.environment.state.asObservable(),
                    this.environment.state.asObserver(),
                    this.population.evaluations));

                console.log(`New Organism: ${org.genotype.id}`);
            });

        return intro;
    }
}
