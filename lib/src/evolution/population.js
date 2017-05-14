"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const rx_1 = require("rx");
const index_1 = require("../index");
class Population {
    constructor(popOptions, genOptions, create, fitness) {
        this.popOptions = popOptions;
        this.genOptions = genOptions;
        this.create = create;
        this.fitness = fitness;
        this.genomes = _.range(0, popOptions.populationSize)
            .map(i => new index_1.Genome(genOptions));
    }
    evolveStep() {
        let gens = index_1.safeReproduceManyToMany(this.genomes, this.genomes.length, this.fitness);
        gens = index_1.safeMutateMany(this.genomes, this.fitness);
        return gens;
    }
    evolve(generations) {
        _.range(0, generations).forEach(i => {
            this.genomes = this.evolveStep();
        });
        let b = index_1.best(this.genomes, this.fitness);
        return b;
    }
    evolve$(generations, timeout = 3000) {
        // let i = 1;
        // console.log(`Generation: ${i}`);
        // return Observable.generate(
        //     this.genomes,
        //     gens => i <= generations,
        //     gens => {
        //         this.genomes = this.evolveStep();
        //         i++;
        //         console.log(`Generation: ${i}`);
        //         return this.genomes;
        //     },
        //     gens => best(gens, this.fitness),
        //     Rx.Scheduler.timeout
        // )
        return rx_1.Observable
            .interval(10)
            .do(i => console.log(`Generation: ${i + 1}`))
            .map(i => this.genomes)
            .map(gens => {
            this.genomes = this.evolveStep();
            return this.genomes;
        })
            .map(gens => index_1.best(gens, this.fitness))
            .takeWhile(b => b.fitness != Infinity)
            .timeout(timeout)
            .take(generations);
    }
}
exports.Population = Population;
//# sourceMappingURL=population.js.map