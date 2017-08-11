import * as Rx from "rxjs";
import { Observable } from "rxjs/Observable";
import { ReplaySubject, Subject } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { FitnessObjective } from "../enums/fitness-objective";
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

    public top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>
    = new ReactiveCollection();

    public avgFitness: ReactiveProperty<number> = new ReactiveProperty();

    public newOrganisms: ReplaySubject<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>
    = new ReplaySubject<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>>(1);

    public organisms: ReactiveCollection<Organism<Gen, Pop, Org, Data, Pheno, AState, EState>> =
    new ReactiveCollection();

    // tslint:disable-next-line:variable-name
    private _best: ReactiveProperty<IEvaluation<Gen, Data, Pheno>> = new ReactiveProperty();

    private subs: Subscription = new Subscription();

    constructor(
        public population: Population<Gen, Pop, Org, Data, Pheno, AState, EState>,
        public environment: Environment<Gen, Pop, Org, Data, Pheno, AState, EState>,
    ) { }

    public get best(): Observable<IEvaluation<Gen, Data, Pheno>> {
        return this._best
            .asObservable()
            .filter((b) => b !== undefined && b != null)
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap);
    }

    public start(): Simulation<Gen, Pop, Org, Data, Pheno, AState, EState> {

        this.subs = new Subscription()
            .add(this.removeDeadOrganisms())
            .add(this.introduceOrganisms())
            .add(this.updateAvgFitness())
            .add(this.updateTop())
            .add(this.updateBest())
            .add(this.population.populate(this.newOrganisms, this.top));

        return this;
    }

    public stop(): void {
        this.subs.unsubscribe();
    }

    private updateBest(): Subscription {
        const update = this.population.evaluations
            .filter((e) => e != null && e !== undefined)
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap)
            .subscribe((evaluation) => {
                if (this._best.value === undefined || this._best.value == null) {
                    this._best.value = evaluation;
                }

                switch (this.population.popOptions.objective) {
                    case FitnessObjective.minimize:
                        if (evaluation.fitness < this._best.value.fitness) {
                            this._best.value = evaluation;
                        }
                        break;

                    case FitnessObjective.maximize:
                        if (evaluation.fitness > this._best.value.fitness) {
                            this._best.value = evaluation;
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
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap)
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
        const update = this.population.evaluations
            .filter((e) => e != null && e !== undefined)
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap)
            .subscribe((e) => {
                this.avgFitness.value = (this.avgFitness.value + e.fitness) / 2;
            },
            (error) => console.log(`error from simulation.updateAvgFitness: ${error}`));

        return update;
    }

    private introduceOrganisms(): Subscription {
        const intro = this.newOrganisms
            .observeOn(Rx.Scheduler.asap)
            .subscribeOn(Rx.Scheduler.asap)
            .subscribe((org) => {
                this.subs.add(org.interactWithEnvironment(
                    this.environment.state.asObservable(),
                    this.environment.state.asObserver(),
                    this.population.evaluations));

                this.organisms.push(org);
            },
            (error) => console.log(`error from simulation.introduceOrganism: ${error}`));

        return intro;
    }

    private removeDeadOrganisms(): Subscription {
        const remove = this.organisms.subscribeToPush((o) => { // when organism is introduced to environment
            o.alive
                .filter((alive) => !alive) // if organisms is dead
                .subscribe((alive) => {
                    this.organisms.remove(o); // remove from organisms
                });
        });

        return remove;
    }
}
