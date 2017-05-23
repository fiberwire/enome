"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("../genotypes/genome");
const generate_genomes_1 = require("../operators/generate-genomes");
const replenish_many_1 = require("../operators/replenish-many");
const reproduce_many_to_one_1 = require("../operators/reproduction/many-to-one/reproduce-many-to-one");
const mutate_1 = require("../operators/mutation/mutate");
const _ = require("lodash");
const rx_1 = require("rx");
class ArtificialSelection {
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
    get current() {
        return this.genomes[0];
    }
    get current$() {
        return this.genomes$
            .map(genomes => genomes[0]);
    }
    refresh() {
        //console.log('refreshing...');
        this._genomes$.onNext(replenish_many_1.replenishMany(this.genomes));
    }
    add(genome) {
        if (this.genomes.length >= this.popOptions.maxSize) {
            this.dequeue();
        }
        this.genomes.push(genome);
    }
    addRange(genomes) {
        genomes.forEach(this.add);
    }
    insert(genome, index, delCount) {
        this.genomes.splice(index, delCount, genome);
    }
    dequeue() {
        let g = this.genomes.shift();
        if (this.genomes.length < this.popOptions.minSize) {
            this.reproduce();
        }
        return g;
    }
    requeue() {
        this.add(this.dequeue());
    }
    remove(genome) {
        this.genomes = this.genomes.filter(g => !_.isEqual(g, genome));
    }
    removeAtIndex(index) {
        let g = this.genomes[index];
        this.remove(g);
    }
    //requeues the current genome to the end of the array
    keep() {
        this.requeue();
        this.refresh();
    }
    //removes the current genome, adds a new offspring of the whole array to the end
    kill() {
        this.dequeue();
        this.reproduce();
    }
    //adds a new offspring of the whole array to the end
    reproduce(n = 1) {
        _.range(n).forEach(i => {
            let g = reproduce_many_to_one_1.reproduceManyToOne(this.genomes);
            g = mutate_1.mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
            this.add(g);
        });
        this.refresh();
    }
    delete() {
        this.dequeue();
        this.refresh();
    }
    random() {
        this.dequeue();
        this.add(new genome_1.Genome(this.genOptions));
        this.refresh();
    }
    generate() {
        this.add(new genome_1.Genome(this.genOptions));
        this.refresh();
    }
}
exports.ArtificialSelection = ArtificialSelection;
//# sourceMappingURL=artificial-selection.js.map