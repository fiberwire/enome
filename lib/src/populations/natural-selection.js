"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const rx_1 = require("rx");
const index_1 = require("../index");
const fill_random_1 = require("../operators/fill-random");
const fill_worst_1 = require("../operators/fill-worst");
class NaturalSelection {
    constructor(popOptions, genOptions, create, fitness) {
        this.popOptions = popOptions;
        this.genOptions = genOptions;
        this.create = create;
        this.fitness = fitness;
        this.genomes = index_1.generateGenomes(this.popOptions.populationSize, this.genOptions);
    }
    reproduce(gens) {
        switch ({ safe: this.popOptions.reproduceOptions.safe, sampled: this.popOptions.reproduceOptions.sampled }) {
            case { safe: true, sampled: true }:
                gens = index_1.safeSampledReproduceManyToMany(this.genomes, this.genomes.length, this.fitness, this.popOptions.reproduceOptions.sampleSize);
                break;
            case { safe: true, sampled: false }:
                gens = index_1.safeReproduceManyToMany(this.genomes, this.genomes.length, this.fitness);
                break;
            case { safe: false, sampled: true }:
                gens = index_1.sampledReproduceManyToMany(this.genomes, this.genomes.length, this.fitness, this.popOptions.reproduceOptions.sampleSize);
                break;
            case { safe: false, sampled: false }:
                gens = index_1.reproduceManyToMany(this.genomes, this.genomes.length);
                break;
            default:
                gens = index_1.safeReproduceManyToMany(this.genomes, this.genomes.length, this.fitness);
                break;
        }
        return gens;
    }
    mutate(gens) {
        switch ({ safe: this.popOptions.mutateOptions.safe, sampled: this.popOptions.mutateOptions.sampled }) {
            case { safe: true, sampled: true }:
                return index_1.safeSampledMutateMany(this.genomes, this.fitness, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType, this.popOptions.mutateOptions.sampleSize);
            case { safe: true, sampled: false }:
                return index_1.safeMutateMany(this.genomes, this.fitness, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
            case { safe: false, sampled: true }:
                return index_1.sampledMutateMany(this.genomes, this.fitness, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType, this.popOptions.mutateOptions.sampleSize);
            case { safe: false, sampled: false }:
                return index_1.mutateMany(this.genomes, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
            default:
                return index_1.safeMutateMany(this.genomes, this.fitness, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateType);
        }
    }
    fill(gens) {
        switch (this.popOptions.fillType) {
            case 'worst':
                return fill_worst_1.fillWorst(gens, this.fitness, this.popOptions.fillPercent);
            case 'random':
                return fill_random_1.fillRandom(gens, this.popOptions.fillPercent);
            default:
                return fill_worst_1.fillWorst(gens, this.fitness, this.popOptions.fillPercent);
        }
    }
    evolveStep() {
        let gens;
        gens = this.reproduce(this.genomes);
        gens = this.mutate(gens);
        gens = this.fill(gens);
        return gens;
    }
    evolve(generations) {
        _.range(generations).forEach(i => {
            this.genomes = this.evolveStep();
        });
        let b = index_1.best(this.genomes, this.fitness);
        return b;
    }
    evolve$(generations = 1000, timeout = 3000) {
        return rx_1.Observable
            .interval(1)
            .do(i => console.log(`Generation: ${i + 1}`))
            .map(i => this.genomes)
            .map(gens => {
            this.genomes = this.evolveStep();
            return this.genomes;
        })
            .map(gens => index_1.best(gens, this.fitness))
            .take(generations);
    }
}
exports.NaturalSelection = NaturalSelection;
//# sourceMappingURL=natural-selection.js.map