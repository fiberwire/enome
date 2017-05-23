"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("../genotypes/genome");
const generate_genomes_1 = require("../operators/generate-genomes");
const replenish_many_1 = require("../operators/replenish-many");
const reproduce_many_to_one_1 = require("../operators/reproduction/many-to-one/reproduce-many-to-one");
const mutate_1 = require("../operators/mutation/mutate");
const reproduce_many_to_many_1 = require("../operators/reproduction/many-to-many/reproduce-many-to-many");
const mutate_many_1 = require("../operators/mutation/mutate-many");
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
        this.genomes.push(genome);
    }
    addRange(genomes) {
        if (this.genomes.length + genomes.length > this.popOptions.maxSixe) {
            this.genomes = _.concat(this.genomes, genomes)
                .slice(0, this.popOptions.maxSixe);
        }
        else {
            this.genomes = _.concat(this.genomes, genomes);
        }
    }
    insert(genome, index, delCount) {
        this.genomes.splice(index, delCount, genome);
    }
    dequeue() {
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
    replace() {
        this.dequeue();
        this.reproduce();
    }
    //adds a new offspring of the whole array to the end
    reproduce(n = 1) {
        if (this.genomes.length + n > this.popOptions.maxSixe) {
            if (n == 1) {
                let g = reproduce_many_to_one_1.reproduceManyToOne(this.genomes);
                g = mutate_1.mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
                this.dequeue();
                this.add(g);
            }
            else {
                let gs = reproduce_many_to_many_1.reproduceManyToMany(this.genomes, n);
                gs = mutate_many_1.mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
                _.range(n).forEach(i => this.dequeue());
                this.addRange(gs);
            }
        }
        else {
            if (n == 1) {
                let g = reproduce_many_to_one_1.reproduceManyToOne(this.genomes);
                g = mutate_1.mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
                this.add(g);
            }
            else {
                let gs = reproduce_many_to_many_1.reproduceManyToMany(this.genomes, n);
                gs = mutate_many_1.mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
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