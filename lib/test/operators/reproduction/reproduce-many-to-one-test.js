"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const _ = require("lodash");
const genome_1 = require("genotypes/genome");
const mutate_1 = require("operators/mutation/mutate");
const value_1 = require("operators/value");
const reproduce_many_to_one_1 = require("operators/reproduction/many-to-one/reproduce-many-to-one");
describe('operators/reproduction', () => {
    describe('reproduceManyToOne', () => {
        let gen;
        beforeEach(() => {
            gen = new genome_1.Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });
        });
        it('should produce an offspring from many genomes, given a weight array', () => {
            let offspring;
            it('should accept an array of Genomes', () => {
                let others = _.range(0, 10).map(i => mutate_1.mutate(gen));
                let weights = _.range(0, 10).map(i => value_1.value());
                offspring = reproduce_many_to_one_1.reproduceManyToOne(_.concat(others, gen), weights);
                chai_1.expect(offspring.nucleos).to.eql(gen.options.genomeLength);
            });
        });
    });
});
//# sourceMappingURL=reproduce-many-to-one-test.js.map