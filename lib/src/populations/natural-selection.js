"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutate_type_1 = require("../enums/mutate-type");
const reproduce_type_1 = require("../enums/reproduce-type");
const fitness_objective_1 = require("../enums/fitness-objective");
const fill_type_1 = require("../enums/fill-type");
const _ = require("lodash");
const rx_1 = require("rx");
const index_1 = require("../index");
const fill_random_1 = require("../operators/fill-random");
const fill_worst_1 = require("../operators/fill-worst");
const worst_1 = require("../operators/worst");
class NaturalSelection {
    constructor(popOptions, genOptions, create, fitness) {
        this.popOptions = popOptions;
        this.genOptions = genOptions;
        this.create = create;
        this.fitness = fitness;
        this.genomes = index_1.generateGenomes(this.popOptions.populationSize, this.genOptions);
    }
    reproduce(gens) {
        switch (this.popOptions.reproduceOptions.type) {
            case reproduce_type_1.ReproduceType.safeSampled:
                gens = index_1.safeSampledReproduceManyToMany(this.genomes, this.genomes.length, this.fitness, this.popOptions.objective, this.popOptions.reproduceOptions.sampleSize);
                break;
            case reproduce_type_1.ReproduceType.safe:
                gens = index_1.safeReproduceManyToMany(this.genomes, this.genomes.length, this.fitness, this.popOptions.objective);
                break;
            case reproduce_type_1.ReproduceType.sampled:
                gens = index_1.sampledReproduceManyToMany(this.genomes, this.genomes.length, this.fitness, this.popOptions.reproduceOptions.sampleSize);
                break;
            case reproduce_type_1.ReproduceType.normal:
                gens = index_1.reproduceManyToMany(this.genomes, this.genomes.length);
                break;
            default:
                gens = index_1.safeReproduceManyToMany(this.genomes, this.genomes.length, this.fitness, this.popOptions.objective);
                break;
        }
        return gens;
    }
    mutate(gens) {
        switch (this.popOptions.mutateOptions.type) {
            case mutate_type_1.MutateType.safeSampled:
                return index_1.safeSampledMutateMany(this.genomes, this.fitness, this.popOptions.objective, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp, this.popOptions.mutateOptions.sampleSize);
            case mutate_type_1.MutateType.safe:
                return index_1.safeMutateMany(this.genomes, this.fitness, this.popOptions.objective, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
            case mutate_type_1.MutateType.sampled:
                return index_1.sampledMutateMany(this.genomes, this.fitness, this.popOptions.objective, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp, this.popOptions.mutateOptions.sampleSize);
            case mutate_type_1.MutateType.normal:
                return index_1.mutateMany(this.genomes, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
            default:
                return index_1.safeMutateMany(this.genomes, this.fitness, this.popOptions.mutateOptions.mutateChance, this.popOptions.mutateOptions.mutateOp);
        }
    }
    fill(gens) {
        switch (this.popOptions.fillType) {
            case fill_type_1.FillType.worst:
                return fill_worst_1.fillWorst(gens, this.fitness, this.popOptions.fillPercent);
            case fill_type_1.FillType.random:
                return fill_random_1.fillRandom(gens, this.popOptions.fillPercent);
            case fill_type_1.FillType.none:
                return gens;
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
            .map(gens => {
            switch (this.popOptions.objective) {
                case fitness_objective_1.FitnessObjective.maximize:
                    return index_1.best(gens, this.fitness);
                case fitness_objective_1.FitnessObjective.minimize:
                    return worst_1.worst(gens, this.fitness);
            }
        })
            .take(generations);
    }
}
exports.NaturalSelection = NaturalSelection;
//# sourceMappingURL=natural-selection.js.map