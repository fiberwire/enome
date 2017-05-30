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

    constructor(
        public popOptions: U,
        public genOptions: T,
        public create: (gen: Genome<T>) => V,
    ) {
        this.genomes = generateGenomes(this.popOptions.initSize, this.genOptions);

        this.parents = generateGenomes(this.popOptions.minParentPoolSize, this.genOptions)
            .map((g) => ({ genome: g, age: 0 }));
    }

    get current(): Genome<T> {
        return this.genomes[0];
    }

    get currentResult(): V {
        return this.create(this.current);
    }

    // adds the current genome to parents
    public keep() {
        const g = this.shift();
        this.addParent(g);
        this.ageParents();
    }

    // removes the current genome, adds a new offspring
    public kill() {
        this.shift();
        this.ageParents();
    }

    // adds a new offspring
    public reproduce() {
        const offspring = this.produceOffspring();

        if (this.genomes.length >= this.popOptions.maxSize) { // at capacity
            this.shift(offspring);
        }

        this.add(offspring);
        this.ageParents();
    }

    // removes the current genome
    public delete() {
        this.shift();
        this.ageParents();
    }

    // removes the current genome, adds a new random genome
    public random() {
        if (this.genomes.length > this.popOptions.minSize) {
            this.add(new Genome(this.genOptions));
        } else {
            this.shift(new Genome(this.genOptions));
        }

        this.ageParents();
    }

    // adds a new random genome
    public generate() {
        this.add(new Genome(this.genOptions));
        this.ageParents();
    }

    private produceOffspring(): Genome<T> {
        let g = reproduceManyToOne(this.parents.map((p) => p.genome));
        g = mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
        return g;
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

    private add(genome: Genome<T>) {
        if (this.genomes.length >= this.popOptions.maxSize) {
            this.shift();
        }

        this.genomes.push(genome);
    }

    private addParent(genome: Genome<T>) {
        if (this.parents.length >= this.popOptions.maxParentPoolSize) {
            this.removeOldestParent();
        }

        this.parents.push({ genome, age: 0 });
    }

    private shift(genome: Genome<T> = null): Genome<T> {
        const g = this.genomes.shift();

        if (this.genomes.length < this.popOptions.minSize) {
            this.genomes.push(genome || this.produceOffspring());
        }

        return g;
    }

    private remove(genome: Genome<T>) {
        this.genomes = this.genomes.filter((g) => !_.isEqual(g, genome));
    }

    private removeParent(parent: IParent<T>) {
        this.parents = this.parents.filter((p) => !_.isEqual(p, parent));
    }
}
