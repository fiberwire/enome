"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
require("mocha");
describe('populations', () => {
    let { artificial } = mocks_1.mocks();
    beforeEach(() => {
        artificial = mocks_1.mocks().artificial;
    });
    describe('ArtificialSelections', () => {
        it('should generate genomes', () => {
            chai_1.expect(artificial.genomes.length).to.eql(artificial.popOptions.initSize);
        });
        describe('keep', () => {
            it('should return the current genome to the end of the array', () => {
                let gen1 = artificial.genomes[0];
                artificial.keep();
                let gen1again = artificial.genomes[artificial.genomes.length - 1];
                chai_1.expect(gen1).to.eql(gen1again);
            });
        });
        describe('remove', () => {
        });
    });
});
//# sourceMappingURL=artificial-selection.js.map