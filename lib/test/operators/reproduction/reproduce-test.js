"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const genome_1 = require("../../../src/genotypes/genome");
const mutate_1 = require("../../../src/operators/mutation/mutate");
const reproduce_1 = require("../../../src/operators/reproduction/reproduce");
describe('operators/reproduction', () => {
    describe('reproduce', () => {
        let gen;
        beforeEach(() => {
            gen = new genome_1.Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });
        });
        it('should produce an offspring genome with genetics from both parents', () => {
            let mutated = mutate_1.mutate(gen, 0.5);
            chai_1.expect(mutated.sequence.length).to.eql(gen.sequence.length);
            chai_1.expect(mutated.nucleos.length).to.eql(mutated.options.genomeLength);
            let offspring = reproduce_1.reproduce(gen, mutated); //last two parameters are relative weights for each parents chance for their genes to be picked
            chai_1.expect(offspring.sequence.length).to.eql(mutated.sequence.length);
            chai_1.expect(offspring.nucleos.length).to.eql(offspring.options.genomeLength);
            let n = offspring.nucleo;
            chai_1.expect(n.value).to.be.at.least(0);
            chai_1.expect(n.value).to.be.at.most(1);
            let i = n.int(1, 100);
            chai_1.expect(i).to.be.at.least(1);
            chai_1.expect(i).to.be.at.most(100);
            chai_1.expect(gen).not.to.eql(mutated);
            chai_1.expect(gen).not.to.eql(offspring);
            chai_1.expect(mutated).not.to.eql(offspring);
        });
    });
});
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/test/operators/reproduction/reproduce-test.js.map