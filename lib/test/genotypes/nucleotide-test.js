"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const index_1 = require("../../src/index");
require("mocha");
describe('genotypes', () => {
    let { genome } = mocks_1.mocks();
    beforeEach(() => {
        index_1.replenish(genome);
    });
    describe('nucleotide', () => {
        describe('float', () => {
            it('should produce a float between min and max', () => {
                const f = genome.nucleo.float(0, 1);
                chai_1.expect(f).to.be.at.least(0);
                chai_1.expect(f).to.be.at.most(1);
            });
        });
        describe('int', () => {
            it('should produce an int between min and max', () => {
                const i = genome.nucleo.int(1, 10);
                chai_1.expect(i).to.be.at.least(1);
                chai_1.expect(i).to.be.at.most(10);
                chai_1.expect(i % 1).to.eql(0);
            });
        });
        describe('natural', () => {
            it('should produce a natural number between 0 and max', () => {
                const n = genome.nucleo.natural(-1, 10);
                chai_1.expect(n).to.be.at.least(0);
                chai_1.expect(n).to.be.at.most(10);
                chai_1.expect(n % 1).to.eql(0);
            });
        });
        describe('bool', () => {
            it('should produce a boolean', () => {
                const bool = genome.nucleo.bool();
                chai_1.expect(bool).to.satisfy((b) => b == true || b == false);
            });
        });
        describe('letter', () => {
            it('should produce an upper or lower case letter', () => {
                const letter = genome.nucleo.letter();
                chai_1.expect('abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ').to.include(letter);
            });
        });
        describe('letterLower', () => {
            it('should produce a lowercase letter', () => {
                const letter = genome.nucleo.letterLower();
                chai_1.expect('abcdefghijklmnopqrstuvwxyz').to.include(letter);
            });
        });
        describe('letterUpper', () => {
            it('should produce an uppercase letter', () => {
                const letter = genome.nucleo.letterUpper();
                chai_1.expect('ABCDEFGIJKLMNOPQRSTUVWXYZ').to.include(letter);
            });
        });
        describe('char', () => {
            it('should produce a char', () => {
                const char = genome.nucleo.char();
                chai_1.expect('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()')
                    .to.include(char);
            });
        });
        describe('element', () => {
            it('should return an element from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const element = genome.nucleo.element(array);
                chai_1.expect(array).to.include(element);
            });
        });
        describe('elements', () => {
            it('should return an array of elements from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const elements = genome.nucleo.elements(array);
                elements.forEach(e => chai_1.expect(array).to.include(e));
            });
        });
        describe('randomElements', () => {
            it('should return an array of elements from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const elements = genome.nucleo.randomElements(array);
                elements.forEach(e => chai_1.expect(array).to.include(e));
            });
        });
    });
});
//# sourceMappingURL=nucleotide-test.js.map