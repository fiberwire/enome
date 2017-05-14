"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const genome_1 = require("../../src/genotypes/genome");
require("mocha");
describe('genotypes', () => {
    let gen;
    beforeEach(() => {
        gen = new genome_1.Genome({
            genomeLength: 10,
            nucleotideLength: 1
        });
    });
    describe('nucleotide', () => {
        describe('float', () => {
            it('should produce a float between min and max', () => {
                const f = gen.nucleo.float(0, 1);
                chai_1.expect(f).to.be.at.least(0);
                chai_1.expect(f).to.be.at.most(1);
            });
        });
        describe('int', () => {
            it('should produce an int between min and max', () => {
                const i = gen.nucleo.int(1, 10);
                chai_1.expect(i).to.be.at.least(1);
                chai_1.expect(i).to.be.at.most(10);
                chai_1.expect(i % 1).to.eql(0);
            });
        });
        describe('natural', () => {
            it('should produce a natural number between 0 and max', () => {
                const n = gen.nucleo.natural(10);
                chai_1.expect(n).to.be.at.least(0);
                chai_1.expect(n).to.be.at.most(10);
                chai_1.expect(n % 1).to.eql(0);
            });
        });
        describe('bool', () => {
            it('should produce a boolean', () => {
                const bool = gen.nucleo.bool();
                chai_1.expect(bool).to.satisfy((b) => b == true || b == false);
            });
        });
        describe('letter', () => {
            it('should produce an upper or lower case letter', () => {
                const letter = gen.nucleo.letter();
                chai_1.expect('abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ').to.include(letter);
            });
        });
        describe('letterLower', () => {
            it('should produce a lowercase letter', () => {
                const letter = gen.nucleo.letterLower();
                chai_1.expect('abcdefghijklmnopqrstuvwxyz').to.include(letter);
            });
        });
        describe('letterUpper', () => {
            it('should produce an uppercase letter', () => {
                const letter = gen.nucleo.letterUpper();
                chai_1.expect('ABCDEFGIJKLMNOPQRSTUVWXYZ').to.include(letter);
            });
        });
        describe('char', () => {
            it('should produce a char', () => {
                const char = gen.nucleo.char();
                chai_1.expect('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()')
                    .to.include(char);
            });
        });
        describe('element', () => {
            it('should return an element from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const element = gen.nucleo.element(array);
                chai_1.expect(array).to.include(element);
            });
        });
        describe('elements', () => {
            it('should return an array of elements from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const elements = gen.nucleo.elements(array);
                elements.forEach(e => chai_1.expect(array).to.include(e));
            });
        });
        describe('randomElements', () => {
            it('should return an array of elements from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const elements = gen.nucleo.randomElements(array);
                elements.forEach(e => chai_1.expect(array).to.include(e));
            });
        });
    });
});
//# sourceMappingURL=nucleotide-test.js.map