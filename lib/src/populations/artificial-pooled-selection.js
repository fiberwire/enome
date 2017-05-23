"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const rx_1 = require("rx");
const generate_genomes_1 = require("../operators/generate-genomes");
const genome_1 = require("../genotypes/genome");
const mutate_1 = require("../operators/mutation/mutate");
const replenish_many_1 = require("../operators/replenish-many");
const replenish_many_parents_1 = require("operators/parents/replenish-many-parents");
const reproduce_many_to_one_1 = require("../operators/reproduction/many-to-one/reproduce-many-to-one");
class ArtificialPooledSelection {
    constructor(popOptions, genOptions, create) {
        this.popOptions = popOptions;
        this.genOptions = genOptions;
        this.create = create;
        this.genomes = generate_genomes_1.generateGenomes(this.popOptions.initSize, this.genOptions);
        this._genomes$ = new rx_1.BehaviorSubject(this.genomes);
    }
    get genomes$() {
        return this._genomes$;
    }
    get parents$() {
        return this._parents$;
    }
    get genomesAndParents$() {
        return this.genomes$.zip(this.parents$);
    }
    get current() {
        return this.genomes[0];
    }
    get current$() {
        return this.genomes$
            .map(genomes => genomes[0]);
    }
    refresh() {
        //console.log('refreshing...');
        this.refreshGenomes();
        this.refreshParents();
    }
    refreshGenomes() {
        this._genomes$.onNext(replenish_many_1.replenishMany(this.genomes));
    }
    refreshParents() {
        this.parents = _.sortBy(this.parents, p => p.age);
        this._parents$.onNext(replenish_many_parents_1.replenishManyParents(this.parents));
    }
    add(genome) {
        if (this.genomes.length >= this.popOptions.maxSize) {
            this.dequeue();
        }
        this.genomes.push(genome);
    }
    addParent(genome) {
        if (this.parents.length >= this.popOptions.maxParentPoolSize) {
            let oldest = _.maxBy(this.parents, p => p.age);
            _.remove(this.parents, p => _.isEqual(p, oldest));
        }
        this.parents.push({ genome, age: 0 });
    }
    addRange(genomes) {
        if (this.genomes.length + genomes.length > this.popOptions.maxSize) {
            this.genomes = _.concat(this.genomes, genomes)
                .slice(0, this.popOptions.maxSize);
        }
        else {
            this.genomes = _.concat(this.genomes, genomes);
        }
    }
    addParentRange(genomes) {
        genomes.forEach(this.addParent);
    }
    insert(genome, index, delCount = 0) {
        this.genomes.splice(index, delCount, genome);
    }
    insertParent(genome, index, delCount = 0) {
        this.parents.splice(index, delCount, { genome, age: 0 });
    }
    dequeue() {
        let g = this.genomes.shift();
        if (this.genomes.length < this.popOptions.minSize) {
            this.reproduce();
        }
        return g;
    }
    dequeueParent() {
        let p = this.parents.shift();
        if (this.parents.length < this.popOptions.minParentPoolSize) {
            this.addParent(this.dequeue());
        }
        return p;
    }
    requeue() {
        this.add(this.dequeue());
    }
    remove(genome) {
        this.genomes = this.genomes.filter(g => !_.isEqual(g, genome));
    }
    removeParent(parent) {
        this.parents = this.parents.filter(p => !_.isEqual(p, parent));
    }
    removeAtIndex(index) {
        let g = this.genomes[index];
        this.remove(g);
    }
    removeParentAtIndex(index) {
        let p = this.parents[index];
        this.removeParent(p);
    }
    //adds the current genome to parents
    keep() {
        this.addParent(this.dequeue());
        this.refresh();
    }
    //removes the current genome, adds a new offspring
    kill() {
        this.dequeue();
        this.reproduce();
    }
    //adds a new offspring
    reproduce(n = 1) {
        _.range(n).forEach(i => {
            if (this.genomes.length >= this.popOptions.maxSize) {
                this.dequeue();
            }
            let g = reproduce_many_to_one_1.reproduceManyToOne(this.parents.map(p => p.genome));
            g = mutate_1.mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
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
        this.add(new genome_1.Genome(this.genOptions));
        this.refreshGenomes();
    }
    //adds a new random genome
    generate() {
        this.add(new genome_1.Genome(this.genOptions));
        this.refreshGenomes();
    }
}
exports.ArtificialPooledSelection = ArtificialPooledSelection;
//# sourceMappingURL=artificial-pooled-selection.js.map