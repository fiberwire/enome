import * as _ from 'lodash';
import { ArtificialPooledSelectionOptions } from '../options/artificial-pooled-selection-options';
import { BehaviorSubject, Observable } from 'rx';
import { create } from 'domain';
import { generateGenomes } from '../operators/generate-genomes';
import { Genome } from '../genotypes/genome';
import { GenomeOptions } from '../options/genome-options';
import { mutate } from '../operators/mutation/mutate';
import { mutateMany } from '../operators/mutation/mutate-many';
import { Parent } from '../interfaces/parent';
import { replenishMany } from '../operators/replenish-many';
import { replenishManyParents } from 'operators/parents/replenish-many-parents';
import { reproduceManyToMany } from '../operators/reproduction/many-to-many/reproduce-many-to-many';
import { reproduceManyToOne } from '../operators/reproduction/many-to-one/reproduce-many-to-one';


export class ArtificialPooledSelection<T extends GenomeOptions, U extends ArtificialPooledSelectionOptions, V>{

    genomes: Genome<T>[];
    parents: Parent<T>[];

    private _genomes$: BehaviorSubject<Genome<T>[]>;
    private _parents$: BehaviorSubject<Parent<T>[]>;

    get genomes$(): Observable<Genome<T>[]> {
        return this._genomes$;
    }

    get parents$(): Observable<Parent<T>[]> {
        return this._parents$;
    }

    get genomesAndParents$(): Observable<[Genome<T>[], Parent<T>[]]> {
        return this.genomes$.zip(this.parents$);
    }

    constructor(
        public popOptions: U,
        public genOptions: T,
        public create: (gen: Genome<T>) => V
    ) {
        this.genomes = generateGenomes(this.popOptions.initSize, this.genOptions);
        this._genomes$ = new BehaviorSubject(this.genomes);

        this.parents = generateGenomes(this.popOptions.minParentPoolSize, this.genOptions)
        .map(g => ({genome: g, age: 0}))
        this._parents$ = new BehaviorSubject(this.parents);
    }

    get current(): Genome<T> {
        return this.genomes[0];
    }

    get current$(): Observable<Genome<T>> {
        return this.genomes$
            .map(genomes => genomes[0]);
    }

    private refresh() {
        //console.log('refreshing...');
        this.refreshGenomes();
        this.refreshParents();
    }

    private refreshGenomes() {
        this._genomes$.onNext(replenishMany(this.genomes));
    }

    private refreshParents() {
        this.parents = _.sortBy(this.parents, p => p.age);
        this._parents$.onNext(replenishManyParents(this.parents));
    }

    private add(genome: Genome<T>) {
        if (this.genomes.length >= this.popOptions.maxSize) {
            this.dequeue();
        }
        
        this.genomes.push(genome);
    }

    private addParent(genome: Genome<T>) {
        if (this.parents.length >= this.popOptions.maxParentPoolSize) {
            let oldest = _.maxBy(this.parents, p => p.age);
            _.remove(this.parents, p => _.isEqual(p, oldest));
        }

        this.parents.push({ genome, age: 0 });
    }

    private addRange(genomes: Genome<T>[]) {
        if (this.genomes.length + genomes.length > this.popOptions.maxSize) {
            this.genomes = _.concat(this.genomes, genomes)
                .slice(0, this.popOptions.maxSize);
        }
        else {
            this.genomes = _.concat(this.genomes, genomes);
        }
    }

    private addParentRange(genomes: Genome<T>[]) {
        genomes.forEach(this.addParent);
    }

    private insert(genome: Genome<T>, index: number, delCount: number = 0) {
        this.genomes.splice(index, delCount, genome);
    }

    private insertParent(genome: Genome<T>, index: number, delCount: number = 0) {
        this.parents.splice(index, delCount, { genome, age: 0 });
    }

    private dequeue(): Genome<T> {
        let g = this.genomes.shift();

        if (this.genomes.length < this.popOptions.minSize) {
            this.reproduce();
        }

        return g;
    }

    private dequeueParent(): Parent<T> {
        let p = this.parents.shift();

        if (this.parents.length < this.popOptions.minParentPoolSize) {
            this.addParent(this.dequeue());
        }

        return p;
    }

    private requeue() {
        this.add(this.dequeue());
    }

    private remove(genome: Genome<T>) {
        this.genomes = this.genomes.filter(g => !_.isEqual(g, genome));
    }

    private removeParent(parent: Parent<T>) {
        this.parents = this.parents.filter(p => !_.isEqual(p, parent));
    }

    private removeAtIndex(index: number) {
        let g = this.genomes[index];
        this.remove(g);
    }

    private removeParentAtIndex(index: number) {
        let p = this.parents[index];
        this.removeParent(p);
    }


    //adds the current genome to parents
    keep() {
        this.addParent(this.dequeue());
        this.reproduce();
    }

    //removes the current genome, adds a new offspring
    kill() {
        this.dequeue();
        this.reproduce();
    }

    //adds a new offspring
    reproduce(n: number = 1) {
        _.range(n).forEach(i => {
            if (this.genomes.length >= this.popOptions.maxSize) { //at capacity
                this.dequeue();
            }

            let g = reproduceManyToOne(this.parents.map(p => p.genome));
            g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
            this.add(g);
        });

        this.refresh();
    }

    //removes the current genome
    delete() {
        this.dequeue();
        this.refreshGenomes();
    }

    //removes the current genome, adds a new random genome
    random() {
        this.dequeue();
        this.add(new Genome(this.genOptions));
        this.refreshGenomes();
    }

    //adds a new random genome
    generate() {
        this.add(new Genome(this.genOptions));
        this.refreshGenomes();
    }
}