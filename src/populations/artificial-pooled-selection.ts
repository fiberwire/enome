import { create } from "domain";
import * as _ from "lodash";
import { replenishManyParents } from "operators/parents/replenish-many-parents";
import { BehaviorSubject, Observable } from "rx";
import { Genome } from "../genotypes/genome";
import { IParent } from "../interfaces/parent";
import { generateGenomes } from "../operators/generate-genomes";
import { mutate } from "../operators/mutation/mutate";
import { mutateMany } from "../operators/mutation/mutate-many";
import { replenishMany } from "../operators/replenish-many";
import { reproduceManyToMany } from "../operators/reproduction/many-to-many/reproduce-many-to-many";
import { reproduceManyToOne } from "../operators/reproduction/many-to-one/reproduce-many-to-one";
import { IArtificialPooledSelectionOptions } from "../options/artificial-pooled-selection-options";
import { IGenomeOptions } from "../options/genome-options";

export class ArtificialPooledSelection<T extends IGenomeOptions, U extends IArtificialPooledSelectionOptions, V>{

    public genomes: Array<Genome<T>>;
    public parents: Array<IParent<T>>;

    private genomesSubject: BehaviorSubject<Array<Genome<T>>>;
    private parentSubject: BehaviorSubject<Array<IParent<T>>>;

    get genomes$(): Observable<Array<Genome<T>>> {
        return this.genomesSubject;
    }

    get parents$(): Observable<Array<IParent<T>>> {
        return this.parentSubject;
    }

    get genomesAndParents$(): Observable<[Array<Genome<T>>, Array<IParent<T>>]> {
        return this.genomes$.zip(this.parents$);
    }

    constructor(
        public popOptions: U,
        public genOptions: T,
        public create: (gen: Genome<T>) => V,
    ) {
        this.genomes = generateGenomes(this.popOptions.initSize, this.genOptions);
        this.genomesSubject = new BehaviorSubject(this.genomes);

        this.parents = generateGenomes(this.popOptions.minParentPoolSize, this.genOptions)
            .map((g) => ({ genome: g, age: 0 }));
        this.parentSubject = new BehaviorSubject(this.parents);
    }

    get current(): Genome<T> {
        return this.genomes[0];
    }

    get current$(): Observable<Genome<T>> {
        return this.genomes$
            .map((genomes) => genomes[0]);
    }

    // adds the current genome to parents
    public keep() {
        this.addParent(this.dequeue());
        this.reproduce();
    }

    // removes the current genome, adds a new offspring
    public kill() {
        this.dequeue();
        this.reproduce();
    }

    // adds a new offspring
    public reproduce(n: number = 1) {
        _.range(n).forEach((i) => {
            if (this.genomes.length >= this.popOptions.maxSize) { // at capacity
                this.dequeue();
            }

            let g = reproduceManyToOne(this.parents.map((p) => p.genome));
            g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
            this.add(g);
        });

        this.refresh();
    }

    // removes the current genome
    public delete() {
        this.dequeue();
        this.refreshGenomes();
    }

    // removes the current genome, adds a new random genome
    public random() {
        this.dequeue();
        this.add(new Genome(this.genOptions));
        this.refreshGenomes();
    }

    // adds a new random genome
    public generate() {
        this.add(new Genome(this.genOptions));
        this.refreshGenomes();
    }

    private ageParents(n: number = 1) {
        this.parents = this.parents.map((p) => {
            return {
                age: p.age + n,
                genome: p.genome,
            };
        });
    }

    private removeOldestParent() {
        this.removeParent(_.maxBy(this.parents, (p) => p.age));
    }

    private refresh() {
        // console.log('refreshing...');
        this.refreshGenomes();
        this.refreshParents();
    }

    private refreshGenomes() {
        this.genomesSubject.onNext(replenishMany(this.genomes));
    }

    private refreshParents() {
        this.ageParents();
        this.parents = _.sortBy(this.parents, (p) => p.age);
        this.parentSubject.onNext(replenishManyParents(this.parents));
    }

    private add(genome: Genome<T>) {
        if (this.genomes.length >= this.popOptions.maxSize) {
            this.dequeue();
        }

        this.genomes.push(genome);
    }

    private addParent(genome: Genome<T>) {
        if (this.parents.length >= this.popOptions.maxParentPoolSize) {
            this.removeOldestParent();
        }

        this.parents.push({ genome, age: 0 });
    }

    private addRange(genomes: Array<Genome<T>>) {
        if (this.genomes.length + genomes.length > this.popOptions.maxSize) {
            this.genomes = _.concat(this.genomes, genomes)
                .slice(0, this.popOptions.maxSize);
        } else {
            this.genomes = _.concat(this.genomes, genomes);
        }
    }

    private addParentRange(genomes: Array<Genome<T>>) {
        genomes.forEach(this.addParent);
    }

    private insert(genome: Genome<T>, index: number, delCount: number = 0) {
        this.genomes.splice(index, delCount, genome);
    }

    private insertParent(genome: Genome<T>, index: number, delCount: number = 0) {
        this.parents.splice(index, delCount, { genome, age: 0 });
    }

    private dequeue(): Genome<T> {
        const g = this.genomes.shift();

        if (this.genomes.length < this.popOptions.minSize) {
            this.reproduce();
        }

        return g;
    }

    private dequeueParent(): IParent<T> {
        const p = this.parents.shift();

        if (this.parents.length < this.popOptions.minParentPoolSize) {
            this.addParent(this.dequeue());
        }

        return p;
    }

    private requeue() {
        this.add(this.dequeue());
    }

    private remove(genome: Genome<T>) {
        this.genomes = this.genomes.filter((g) => !_.isEqual(g, genome));
    }

    private removeParent(parent: IParent<T>) {
        this.parents = this.parents.filter((p) => !_.isEqual(p, parent));
    }

    private removeAtIndex(index: number) {
        const g = this.genomes[index];
        this.remove(g);
    }

    private removeParentAtIndex(index: number) {
        const p = this.parents[index];
        this.removeParent(p);
    }
}
