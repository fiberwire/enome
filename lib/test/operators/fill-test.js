"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const _ = require("lodash");
const genome_1 = require("../../src/genotypes/genome");
const fill_1 = require("../../src/operators/fill");
describe('operators', () => {
    describe('fill', () => {
        let gens;
        beforeEach(() => {
            gens = _.range(1, 5).map(i => new genome_1.Genome({
                genomeLength: 10,
                nucleotideLength: 1
            }));
        });
        it('should return a new array of genomes filled to a certain number with offspring of parents from original array', () => {
            let f = fill_1.fill(gens, 10);
            chai_1.expect(f.length).to.eql(10);
        });
    });
});
//# sourceMappingURL=D:/Projects/nodejs/enome/source-maps/test/operators/fill-test.js.map