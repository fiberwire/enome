import { Observable, Observer, Subject, Subscription } from "rxjs";

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
        public orgOptions: Org) {
    }

    // mutate the organism based on evaluation
    public abstract mutate(
        evaluation: IEvaluation<Gen, Data, Pheno>): Genome<Gen>;

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
            .subscribe(
                (o) => organisms.next(o),
                (error) => console.log(`${error}`),
            );
    }

    // update genotypes as they are evaluated
    private updateGenotype(
        evaluations: Observable<IEvaluation<Gen, Data, Pheno>>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>): Observable<Genome<Gen>> {

        return evaluations
            .map((e) => {
                const update = chance.weighted(
                    [
                        this.mutateGenotype,
                        this.reproduceGenotype,
                        this.randomizeGenotype,
                    ],
                    [
                        this.popOptions.weights.mutate,
                        this.popOptions.weights.reproduce,
                        this.popOptions.weights.randomize,
                    ],
                );

                return update(e, top);
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
        return reproduceManyToOne(top.value.map((t) => t.genotype));
    }

    private randomizeGenotype(
        evaluation: IEvaluation<Gen, Data, Pheno>,
        top: ReactiveCollection<IEvaluation<Gen, Data, Pheno>>,
    ): Genome<Gen> {
        return new Genome(this.genOptions);
    }
}
