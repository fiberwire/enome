"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genome_1 = require("genotypes/genome");
const _ = require("lodash");
const best_1 = require("operators/best");
//produces many offspring from many genomes, each one selected from a sample
function sampledReproduceManyToMany(gens, weights, n, fitness, sampleSize = 5) {
    //create many genomes (according to n)
    return _.range(0, n)
        .map(i => {
        //create sample of genomes (according to sampleSize)
        let sample = _.range(0, sampleSize)
            .map(i => {
            let offspringSeq = _.zip(gens.map(g => g.sequence))
                .map((sequences) => {
                return chance.weighted(chance.weighted(sequences, weights), weights);
            });
            return new genome_1.Genome(chance.weighted(gens, weights).options, offspringSeq);
        });
        //return best genome from sample
        return best_1.best(sample, fitness).genome;
    });
}
exports.sampledReproduceManyToMany = sampledReproduceManyToMany;
//# sourceMappingURL=sampled-reproduce-many-to-many.js.map