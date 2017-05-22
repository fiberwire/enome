"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../index");
const rx_1 = require("rx");
class ArtificialSelection {
    constructor(popOptions, genOptions, create) {
        this.popOptions = popOptions;
        this.genOptions = genOptions;
        this.create = create;
        this.genomes = index_1.generateGenomes(this.popOptions.initSize, this.genOptions);
        this._genomes$ = new rx_1.BehaviorSubject(this.genomes);
    }
    get genomes$() {
        return this._genomes$;
    }
    refresh() {
        console.log('refreshing...');
        this._genomes$.onNext(index_1.replenishMany(this.genomes));
    }
    _add(genome) {
        this.genomes.push(genome);
    }
    _addRange(genomes) {
        if (this.genomes.length + genomes.length > this.popOptions.maxSixe) {
            this.genomes = _.concat(this.genomes, genomes)
                .slice(0, this.popOptions.maxSixe);
        }
        else {
            this.genomes = _.concat(this.genomes, genomes);
        }
    }
    _insert(genome, index, delCount) {
        this.genomes.splice(index, delCount, genome);
    }
    _dequeue() {
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
    _requeue() {
        this._add(this._dequeue());
    }
    _remove(genome) {
        this.genomes = this.genomes.filter(g => !_.isEqual(g, genome));
    }
    _removeAtIndex(index) {
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
    reproduce(n = 1) {
        if (this.genomes.length + n > this.popOptions.maxSixe) {
            if (n == 1) {
                let g = index_1.reproduceManyToOne(this.genomes);
                g = index_1.mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
                this._dequeue();
                this._add(g);
            }
            else {
                let gs = index_1.reproduceManyToMany(this.genomes, n);
                gs = index_1.mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
                _.range(n).forEach(i => this._dequeue());
                this._addRange(gs);
            }
        }
        else {
            if (n == 1) {
                let g = index_1.reproduceManyToOne(this.genomes);
                g = index_1.mutate(g, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
                this._add(g);
            }
            else {
                let gs = index_1.reproduceManyToMany(this.genomes, n);
                gs = index_1.mutateMany(gs, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
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
        this._add(new index_1.Genome(this.genOptions));
        this.refresh();
    }
    generate() {
        this._add(new index_1.Genome(this.genOptions));
        this.refresh();
    }
}
exports.ArtificialSelection = ArtificialSelection;
//# sourceMappingURL=artificial-selection.js.map