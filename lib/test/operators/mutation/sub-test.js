"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sub_1 = require("../../../src/operators/mutation/sub");
const replenish_1 = require("../../../src/operators/replenish");
require("mocha");
const chai_1 = require("chai");
const mocks_1 = require("../../mocks");
describe('operators', () => {
    describe('mutation', () => {
        let { genome } = mocks_1.mocks();
        beforeEach(() => {
            genome = replenish_1.replenish(genome);
        });
        describe('sub', () => {
            it('should mutate a genome by replacing values with randomly generated values', () => {
                let mutant = sub_1.sub(genome, 1);
                chai_1.expect(mutant.sequence.length).to.eql(genome.sequence.length);
                chai_1.expect(mutant.sequence).not.to.deep.equal(genome.sequence);
            });
        });
    });
});
//# sourceMappingURL=sub-test.js.map