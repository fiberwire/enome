import * as _ from 'lodash';
import {
    ArtificialSelectionOptions,
    Evaluation,
    generateGenomes,
    Genome,
    GenomeOptions,
    reproduceManyToOne,
    sampledReproduceManyToOne,
    reproduceManyToMany,
    mutate,
    mutateMany,
    replenishMany
} from '../index';
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

    private refresh() {
        console.log('refreshing...');
        this._genomes$.onNext(replenishMany(this.genomes));
    }

    private _add(genome: Genome<T>) {
        this.genomes.push(genome);
    }

    private _addRange(genomes: Genome<T>[]) {
        if (this.genomes.length + genomes.length > this.popOptions.maxSixe) {
            this.genomes = _.concat(this.genomes, genomes)
                .slice(0, this.popOptions.maxSixe);
        }
        else {
            this.genomes = _.concat(this.genomes, genomes);
        }

    }

    private _insert(genome: Genome<T>, index: number, delCount: number) {
        this.genomes.splice(index, delCount, genome);
    }

    private _dequeue(): Genome<T> {
        let g = this.genomes.shift();
        this._remove(g);

        if (this.genomes.length < this.popOptions.minSize) {
            this.reproduce();
            return g;
        }
        else {
            return g;
        }
    }

    private _requeue() {
        this._add(this._dequeue());
    }

    private _remove(genome: Genome<T>) {
        this.genomes = this.genomes.filter(g => !_.isEqual(g, genome));
    }

    private _removeAtIndex(index: number) {
        let g = this.genomes[index];
        this._remove(g);
    }


    //requeues the current genome to the end of the array
    keep() {
        this._requeue();
        this.refresh();
    }

    //removes the current genome, adds a new offspring of the whole array to the end
    replace() {
        this._dequeue();
        this.reproduce();
    }

    //adds a new offspring of the whole array to the end
    reproduce(n: number = 1) {
        if (this.genomes.length + n > this.popOptions.maxSixe) { //at capacity
            if (n == 1) {
                let g = reproduceManyToOne(this.genomes);
                g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
                this._dequeue();
                this._add(g);
            }
            else {
                let gs = reproduceManyToMany(this.genomes, n)
                gs = mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType)
                _.range(n).forEach(i => this._dequeue());
                this._addRange(gs);
            }
        }
        else {
            if (n == 1) {
                let g = reproduceManyToOne(this.genomes);
                g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
                this._add(g);
            }
            else {
                let gs = reproduceManyToMany(this.genomes, n)
                gs = mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType)
                this._addRange(gs);
            }
        }
        this.refresh();
    }

    kill() {
        this._dequeue();
        this.refresh();
    }

    random() {
        this._dequeue();
        this._add(new Genome(this.genOptions));
        this.refresh();
    }

    generate() {
        this._add(new Genome(this.genOptions));
        this.refresh();
    }
}