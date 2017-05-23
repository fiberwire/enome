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
    describe('ArtificialSelection', () => {
        it('should generate genomes', () => {
            chai_1.expect(artificial.genomes.length).to.eql(artificial.popOptions.initSize);
        });
        describe('current', () => {
            it('should be the first genome in genomes', () => {
                chai_1.expect(artificial.current).to.eql(artificial.genomes[0]);
            });
        });
        describe('current$', () => {
            it('should be an observable of the first genome in genomes', () => {
                artificial.current$
                    .take(3)
                    .subscribe(g => {
                    chai_1.expect(g).to.eql(artificial.current);
                    artificial.keep();
                });
            });
        });
        describe('genomes$', () => {
            it('should stay synced with genomes', () => {
                artificial.genomes$
                    .take(3)
                    .subscribe(genomes => {
                    chai_1.expect(artificial.genomes).to.eql(genomes);
                    artificial.keep();
                });
            });
        });
        describe('keep', () => {
            it('should return the current genome to the end', () => {
                let l1 = artificial.genomes.length;
                let first1 = artificial.genomes[0];
                let second1 = artificial.genomes[1];
                let last1 = artificial.genomes[artificial.genomes.length - 1];
                artificial.keep();
                let l2 = artificial.genomes.length;
                let first2 = artificial.genomes[0];
                let last2 = artificial.genomes[artificial.genomes.length - 1];
                chai_1.expect(first1).to.eql(last2);
                chai_1.expect(second1).to.eql(first2);
                chai_1.expect(l1).to.eql(l2);
            });
        });
        describe('replace', () => {
            it('should kill the current genome and add a new offspring to the end', () => {
                let l1 = artificial.genomes.length;
                let first1 = artificial.genomes[0];
                let last1 = artificial.genomes[artificial.genomes.length - 1];
                artificial.replace();
                let l2 = artificial.genomes.length;
                let first2 = artificial.genomes[0];
                let last2 = artificial.genomes[artificial.genomes.length - 1];
                chai_1.expect(first1).to.not.eql(first2);
                chai_1.expect(first1).to.not.eql(last2);
                chai_1.expect(l1).to.eql(l2);
            });
        });
        describe('reproduce', () => {
            it('should add a new offspring to the end', () => {
                let l1 = artificial.genomes.length;
                let first1 = artificial.genomes[0];
                let last1 = artificial.genomes[artificial.genomes.length - 1];
                artificial.reproduce();
                let l2 = artificial.genomes.length;
                let first2 = artificial.genomes[0];
                let last2 = artificial.genomes[artificial.genomes.length - 1];
                chai_1.expect(first1).to.eql(first2);
                chai_1.expect(last1).to.not.eql(last2);
                chai_1.expect(last1).to.eql(artificial.genomes[l2 - 2]);
                chai_1.expect(l1).to.be.below(l2);
            });
        });
        describe('kill', () => {
            it('should remove the current genome', () => {
                let l1 = artificial.genomes.length;
                let first1 = artificial.genomes[0];
                let last1 = artificial.genomes[artificial.genomes.length - 1];
                artificial.kill();
                let l2 = artificial.genomes.length;
                let first2 = artificial.genomes[0];
                let last2 = artificial.genomes[artificial.genomes.length - 1];
                chai_1.expect(first1).to.not.eql(first2);
                chai_1.expect(last1).to.eql(last2);
                chai_1.expect(l1).to.be.above(l2);
            });
        });
        describe('random', () => {
            it('should kill the current genome and add a new random genome to the end', () => {
                let l1 = artificial.genomes.length;
                let first1 = artificial.genomes[0];
                let last1 = artificial.genomes[artificial.genomes.length - 1];
                artificial.random();
                let l2 = artificial.genomes.length;
                let first2 = artificial.genomes[0];
                let last2 = artificial.genomes[artificial.genomes.length - 1];
                chai_1.expect(first1).to.not.eql(first2);
                chai_1.expect(first1).to.not.eql(last2);
                chai_1.expect(last1).to.eql(artificial.genomes[l2 - 2]);
                chai_1.expect(l1).to.eql(l2);
            });
        });
        describe('generate', () => {
            it('should kill the current genome and add a new random genome to the end', () => {
                let l1 = artificial.genomes.length;
                let first1 = artificial.genomes[0];
                let last1 = artificial.genomes[artificial.genomes.length - 1];
                artificial.generate();
                let l2 = artificial.genomes.length;
                let first2 = artificial.genomes[0];
                let last2 = artificial.genomes[artificial.genomes.length - 1];
                chai_1.expect(first1).to.eql(first1);
                chai_1.expect(last1).to.not.eql(last2);
                chai_1.expect(last1).to.eql(artificial.genomes[l2 - 2]);
                chai_1.expect(l1).to.be.below(l2);
            });
        });
    });
});
//# sourceMappingURL=artificial-selection-test.js.map