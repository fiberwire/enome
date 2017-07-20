import { Subject, Subscription } from "rxjs";

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
    GenType extends IGenomeOptions,
    PopType extends IPopulationOptions,
    OrgType extends IOrganismOptions,
    DataType, PhenoType, EnvStateType> {

    public toMutate: Subject<IEvaluation<GenType, DataType, PhenoType>> =
    new Subject<IEvaluation<GenType, DataType, PhenoType>>();

    public toRandomize: Subject<IEvaluation<GenType, DataType, PhenoType>> =
    new Subject<IEvaluation<GenType, DataType, PhenoType>>();

    public toReproduce: Subject<IEvaluation<GenType, DataType, PhenoType>> =
    new Subject<IEvaluation<GenType, DataType, PhenoType>>();

    public toKill: Subject<Organism<GenType, PopType, OrgType, DataType, PhenoType, EnvStateType>> =
    new Subject<Organism<GenType, PopType, OrgType, DataType, PhenoType, EnvStateType>>();

    public avgFitness: ReactiveProperty<number> = new ReactiveProperty<number>();
    public best: ReactiveProperty<IEvaluation<GenType, DataType, PhenoType>> =
    new ReactiveProperty<IEvaluation<GenType, DataType, PhenoType>>();

    public top: ReactiveCollection<IEvaluation<GenType, DataType, PhenoType>> =
    new ReactiveCollection<IEvaluation<GenType, DataType, PhenoType>>();

    public envs: ReactiveCollection<Environment<EnvStateType>>;
    public organisms: ReactiveCollection<Organism<GenType, PopType, OrgType, DataType, PhenoType, EnvStateType>>;

    private evaluations: Subject<IEvaluation<GenType, DataType, PhenoType>> =
    new Subject<IEvaluation<GenType, DataType, PhenoType>>();

    private subs: Subscription = new Subscription();

    private generation: number = 0;
    private get nextEnv(): Environment<EnvStateType> {
        return _.sortBy(this.envs.value,
            (env) => this.envs.filterCollection((e) => env === e).value.length)[0];
    }

    constructor(
        public genOptions: GenType,
        public popOptions: PopType,
        public orgOptions: OrgType,
        ...envs: Array<Environment<EnvStateType>>) {
        this.envs = new ReactiveCollection<Environment<EnvStateType>>(envs);
        this.organisms =
            new ReactiveCollection<Organism<GenType, PopType, OrgType, DataType, PhenoType, EnvStateType>>();

        this.subs = [
            this.populate(),
            this.updateGenotype(),
            this.updateAvgFitness(),
            this.updateBest(),
            this.updateTop(),
            this.mutateGenotype(),
            this.reproduceGenotype(),
            this.randomizeGenotype(),
            this.killOrganisms(),
        ].reduce((sub, s) => sub.add(s));

        this.evaluations
            .do((e) => this.generation += 1)
            .do((e) => {
                if (this.popOptions.progress &&
                    this.generation % (this.popOptions.generations / 10) === 0) {
                    // tslint:disable-next-line:no-console
                    console.log(`
(${this.generation / this.popOptions.generations * 100}%) Generation: ${this.generation}
        best: ${this.best.value.fitness}
`);
                }
            })
            .skip(this.popOptions.generations)
            .take(1)
            .do((e) => {
                if (this.popOptions.progress) {
                    // tslint:disable-next-line:no-console
                    console.log(`Evolution completed after ${this.generation - 1} generations`);
                }

            })
            .subscribe((e) => this.subs.unsubscribe());

    }

    // mutate the organism based on evaluation
    public abstract mutate(
        evaluation: IEvaluation<GenType, DataType, PhenoType>): Genome<GenType>;

    // create an organism to inject into environment.
    public abstract createOrganism(
        pop: Population<GenType, PopType, OrgType, DataType, PhenoType, EnvStateType>,
        env: Environment<EnvStateType>,
        genome: Genome<GenType>,
        options: IOrganismOptions): Organism<GenType, PopType, OrgType, DataType, PhenoType, EnvStateType>;

    // spawns and evenly distributes organisms across all envs
    public populate(): Subscription {
        return this.envs.subscribe((envs) => {
            this.killAllOrganisms();

            while (this.organisms.value.length < this.popOptions.size) {
                this.organisms.push(
                    this.createOrganism(this, this.nextEnv, new Genome(this.genOptions), this.orgOptions));
            }
        });
    }

    private killAllOrganisms(): void {
        this.organisms.forEach((o) => {
            this.killOrganism(o);
        });
        this.organisms.value = [];
    }

    private killOrganisms(): Subscription {
        return this.toKill
            .subscribe((o) => this.killOrganism(o));
    }

    private killOrganism(org: Organism<GenType, PopType, OrgType, DataType, PhenoType, EnvStateType>): void {
        this.organisms.remove(org);
        org = null;
    }

    // update genotypes as they are evaluated
    private updateGenotype(): Subscription {
        return this.evaluations
            .subscribe((e) => {
                this.isCyclic(e);

                // randomly choose between mutating, reproducing, or randomizing
                // mutation is twice as likely as reproduction
                // reproduction is twice as likely as randomization
                chance
                    .weighted([
                        this.toMutate,
                        this.toReproduce,
                        this.toRandomize,
                    ],
                    [
                        this.popOptions.weights.mutate,
                        this.popOptions.weights.reproduce,
                        this.popOptions.weights.randomize],
                )
                    .next(e);
            });
    }

    private isCyclic(obj: any) {
        const keys: any[] = [];
        const stack: any[] = [];
        const stackSet: Set<any> = new Set();
        let detected = false;

        function detect(ob: any, key: any) {
            if (!(ob instanceof Object)) { return; } // Now works with other
            // kinds of object.

            if (stackSet.has(ob)) { // it's cyclic! Print the object and its locations.
                const oldindex = stack.indexOf(ob);
                const l1 = keys.join(".") + "." + key;
                const l2 = keys.slice(0, oldindex + 1).join(".");
                // tslint:disable-next-line:no-console
                console.log("CIRCULAR: " + l1 + " = " + l2 + " = " + ob);
                // tslint:disable-next-line:no-console
                console.log(ob);
                detected = true;
                return;
            }

            keys.push(key);
            stack.push(ob);
            stackSet.add(ob);
            for (const k in ob) { // dive on the object's children
                if (ob.hasOwnProperty(k)) { detect(ob[k], k); }
            }

            keys.pop();
            stack.pop();
            stackSet.delete(ob);
            return;
        }

        detect(obj, "obj");
        return detected;
    }

    private updateAvgFitness(): Subscription {
        return this.evaluations
            .subscribe((e) => {
                this.avgFitness.value = (this.avgFitness.value + e.fitness) / 2;
            });
    }

    private updateBest(): Subscription {
        return this.evaluations.asObservable()
            .do((e) => { // set as best if there is no current best
                if (this.best.value === undefined) {
                    this.best.value = e;
                }
            })
            .filter((e) => {
                switch (this.popOptions.objective) {
                    case FitnessObjective.minimize:
                        return e.fitness < this.best.value.fitness;

                    case FitnessObjective.maximize:
                    default:
                        return e.fitness > this.best.value.fitness;
                }
            })
            // .do((e) => console.log(`new best: ${e.fitness} (old best: ${this.best.value.fitness})`))
            .map((e) => cloneEvaluation(e))
            .subscribe((e) => this.best.value = e);
    }

    private updateTop(): Subscription {
        return this.evaluations.asObservable()
            .filter((e) => this.best.value != null && this.best.value !== undefined)
            .filter((e) => {
                switch (this.popOptions.objective) {
                    case FitnessObjective.minimize:
                        return e.fitness < this.best.value.fitness;

                    case FitnessObjective.maximize:
                    default:
                        return e.fitness > this.best.value.fitness;
                }
            })
            .map(cloneEvaluation)
            .subscribe((e) => {
                let top = this.top.value;
                top.push(e);
                top = _.sortBy(top, (t) => t.fitness);
                top = new Gene(this.popOptions.topPercent).elements(top);
                this.top.value = top;
            });
    }

    private mutateGenotype(): Subscription {
        return this.toMutate
            .subscribe((e) => {
                const g = this.mutate(e);
                this.organisms.push(this.createOrganism(this, this.nextEnv, g, this.orgOptions));
            });
    }

    private reproduceGenotype(): Subscription {
        return this.toReproduce.asObservable()
            .filter((e) => this.organisms.value.length > 0)
            .subscribe((e) => {

                let offspring: Genome<GenType>;

                if (this.top.value.length > 0) {
                    offspring = reproduceManyToOne(
                        this.top.mapCollection((t) => t.genotype).value);
                } else {
                    offspring = reproduceManyToOne(
                        this.organisms.mapCollection((t) => t.genotype).value);
                }

                this.organisms.push(this.createOrganism(this, this.nextEnv, offspring, this.orgOptions));
            });
    }

    private randomizeGenotype(): Subscription {
        return this.toRandomize
            .subscribe((e) => {
                const g = new Genome(this.genOptions);
                this.organisms.push(this.createOrganism(this, this.nextEnv, g, this.orgOptions));
            });
    }
}
