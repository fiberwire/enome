import { create } from 'domain';
import { Genome } from '../genotypes/genome';
import { generateGenomes } from '../operators/generate-genomes';
import { replenishMany } from '../operators/replenish-many';
import { reproduceManyToOne } from '../operators/reproduction/many-to-one/reproduce-many-to-one';
import { mutate } from '../operators/mutation/mutate';
import { reproduceManyToMany } from '../operators/reproduction/many-to-many/reproduce-many-to-many';
import { mutateMany } from '../operators/mutation/mutate-many';
import { GenomeOptions } from '../options/genome-options';
import { ArtificialSelectionOptions } from '../options/artificial-selection-options';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rx';

export class ArtificialSelection<T extends GenomeOptions, U extends ArtificialSelectionOptions, V>{

    genomes: Genome<T>[];
    private _genomes$: BehaviorSubject<Genome<T>[]>

    get genomes$(): Observable<Genome<T>[]> {
        return this._genomes$;
    }

    constructor(
        public popOptions: U,
        public genOptions: T,
        public create: (gen: Genome<T>) => V
    ) {
        this.genomes = generateGenomes(this.popOptions.initSize, this.genOptions);
        this._genomes$ = new BehaviorSubject(this.genomes);
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
        this._genomes$.onNext(replenishMany(this.genomes));
    }

    private add(genome: Genome<T>) {
        this.genomes.push(genome);
    }

    private addRange(genomes: Genome<T>[]) {
        if (this.genomes.length + genomes.length > this.popOptions.maxSixe) {
            this.genomes = _.concat(this.genomes, genomes)
                .slice(0, this.popOptions.maxSixe);
        }
        else {
            this.genomes = _.concat(this.genomes, genomes);
        }

    }

    private insert(genome: Genome<T>, index: number, delCount: number) {
        this.genomes.splice(index, delCount, genome);
    }

    private dequeue(): Genome<T> {
        let g = this.genomes.shift();
        this.remove(g);

        if (this.genomes.length < this.popOptions.minSize) {
            this.reproduce();
            return g;
        }
        else {
            return g;
        }
    }

    private requeue() {
        this.add(this.dequeue());
    }

    private remove(genome: Genome<T>) {
        this.genomes = this.genomes.filter(g => !_.isEqual(g, genome));
    }

    private removeAtIndex(index: number) {
        let g = this.genomes[index];
        this.remove(g);
    }


    //requeues the current genome to the end of the array
    keep() {
        this.requeue();
        this.refresh();
    }

    //removes the current genome, adds a new offspring of the whole array to the end
    replace() {
        this.dequeue();
        this.reproduce();
    }

    //adds a new offspring of the whole array to the end
    reproduce(n: number = 1) {
        if (this.genomes.length + n > this.popOptions.maxSixe) { //at capacity
            if (n == 1) {
                let g = reproduceManyToOne(this.genomes);
                g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
                this.dequeue();
                this.add(g);
            }
            else {
                let gs = reproduceManyToMany(this.genomes, n)
                gs = mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp)
                _.range(n).forEach(i => this.dequeue());
                this.addRange(gs);
            }
        }
        else {
            if (n == 1) {
                let g = reproduceManyToOne(this.genomes);
                g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
                this.add(g);
            }
            else {
                let gs = reproduceManyToMany(this.genomes, n)
                gs = mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp)
                this.addRange(gs);
            }
        }
        this.refresh();
    }

    kill() {
        this.dequeue();
        this.refresh();
    }

    random() {
        this.dequeue();
        this.add(new Genome(this.genOptions));
        this.refresh();
    }

    generate() {
        this.add(new Genome(this.genOptions));
        this.refresh();
    }
}