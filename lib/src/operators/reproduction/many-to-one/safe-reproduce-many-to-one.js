"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("../../../index");
//produce one offspring from many provided genomes, then returns the offspring if it is better than the top 50% on average, otherwise returns the best genome
function safeReproduceManyToOne(genomes, fitness, weights = _.range(0, genomes.length).map(i => index_1.value())) {
    let offspring = index_1.reproduceManyToOne(genomes, weights);
    let t = index_1.top(genomes, 0.5, fitness);
    let offspringFitness = fitness(offspring).fitness;
    let avgFitness = _.meanBy(t, e => e.fitness);
    if (offspringFitness > avgFitness) {
        return offspring;
    }
    else {
        return index_1.best(genomes, fitness).genome;
    }
}
exports.safeReproduceManyToOne = safeReproduceManyToOne;
//# sourceMappingURL=safe-reproduce-many-to-one.js.map