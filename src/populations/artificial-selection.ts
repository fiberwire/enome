import { create } from "domain";
import * as _ from "lodash";
import { BehaviorSubject, Observable } from "rx";
import { Genome } from "../genotypes/genome";
import { generateGenomes } from "../operators/generate-genomes";
import { mutate } from "../operators/mutation/mutate";
import { mutateMany } from "../operators/mutation/mutate-many";
import { replenishMany } from "../operators/replenish-many";
import { reproduceManyToMany } from "../operators/reproduction/many-to-many/reproduce-many-to-many";
import { reproduceManyToOne } from "../operators/reproduction/many-to-one/reproduce-many-to-one";
import { IArtificialSelectionOptions } from "../options/artificial-selection-options";
import { IGenomeOptions } from "../options/genome-options";

export class ArtificialSelection<T extends IGenomeOptions, U extends IArtificialSelectionOptions, V>{

    public genomes: Array<Genome<T>>;
    private genomesSubject: BehaviorSubject<Array<Genome<T>>>;

    get genomes$(): Observable<Array<Genome<T>>> {
        return this.genomesSubject;
    }

    constructor(
        public popOptions: U,
        public genOptions: T,
        public create: (gen: Genome<T>) => V,
    ) {
        this.genomes = generateGenomes(this.popOptions.initSize, this.genOptions);
        this.genomesSubject = new BehaviorSubject(this.genomes);
    }

    get current(): Genome<T> {
        return this.genomes[0];
    }

    get current$(): Observable<Genome<T>> {
        return this.genomes$
            .map((genomes) => genomes[0]);
    }

    // requeues the current genome to the end of the array
    public keep() {
        this.requeue();
        this.refresh();
    }

    // removes the current genome, adds a new offspring of the whole array to the end
    public kill() {
        this.dequeue();
        this.reproduce();
    }

    // adds a new offspring of the whole array to the end
    public reproduce(n: number = 1) {

        _.range(n).forEach((i) => {
            let g = reproduceManyToOne(this.genomes);
            g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
            this.add(g);
        });

        this.refresh();
    }

    public delete() {
        this.dequeue();
        this.refresh();
    }

    public random() {
        this.dequeue();
        this.add(new Genome(this.genOptions));
        this.refresh();
    }

    public generate() {
        this.add(new Genome(this.genOptions));
        this.refresh();
    }

    private refresh() {
        // console.log('refreshing...');
        this.genomesSubject.onNext(replenishMany(this.genomes));
    }

    private add(genome: Genome<T>) {
        if (this.genomes.length >= this.popOptions.maxSize) {
            this.dequeue();
        }

        this.genomes.push(genome);
    }

    private addRange(genomes: Array<Genome<T>>) {
        genomes.forEach(this.add);
    }

    private insert(genome: Genome<T>, index: number, delCount: number) {
        this.genomes.splice(index, delCount, genome);
    }

    private dequeue(): Genome<T> {
        const g = this.genomes.shift();

        if (this.genomes.length < this.popOptions.minSize) {
            this.reproduce();
        }

        return g;
    }

    private requeue() {
        this.add(this.dequeue());
    }

    private remove(genome: Genome<T>) {
        this.genomes = this.genomes.filter((g) => !_.isEqual(g, genome));
    }

    private removeAtIndex(index: number) {
        const g = this.genomes[index];
        this.remove(g);
    }
}
