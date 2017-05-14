"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replenish_1 = require("../../src/operators/replenish");
require("mocha");
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
describe('operators', () => {
    let { genome } = mocks_1.mocks();
    describe('replenish', () => {
        it('should return a new genome with replenished nucleos', () => {
            let n = genome.nucleo;
            chai_1.expect(genome.nucleos.length).to.eql(genome.nucleotides.length - 1);
            genome = replenish_1.replenish(genome);
            chai_1.expect(genome.nucleos.length).to.eql(genome.nucleotides.length);
        });
    });
});
//# sourceMappingURL=replenish-test.js.map