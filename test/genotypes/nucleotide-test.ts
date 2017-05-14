import { expect } from 'chai';
import { Genome } from '../../src/genotypes/genome';
import { GenomeOptions } from '../../src/options/genome-options';
import 'mocha';

describe('genotypes', () => {
    let gen: Genome<GenomeOptions>

    beforeEach(() => {
        gen = new Genome({
            genomeLength: 10,
            nucleotideLength: 1
        });
    })

    describe('nucleotide', () => {

        describe('float', () => {
            it('should produce a float between min and max', () => {
                const f = gen.nucleo.float(0, 1);
                expect(f).to.be.at.least(0);
                expect(f).to.be.at.most(1);
            })
        })

        describe('int', () => {
            it('should produce an int between min and max', () => {
                const i = gen.nucleo.int(1, 10);
                expect(i).to.be.at.least(1);
                expect(i).to.be.at.most(10);
                expect(i % 1).to.eql(0);
            })
        })

        describe('natural', () => {
            it('should produce a natural number between 0 and max', () => {
                const n = gen.nucleo.natural(10);
                expect(n).to.be.at.least(0);
                expect(n).to.be.at.most(10);
                expect(n % 1).to.eql(0);
            })
        })

        describe('bool', () => {
            it('should produce a boolean', () => {
                const bool = gen.nucleo.bool();
                expect(bool).to.satisfy((b: boolean) => b == true || b == false)
            })
        })

        describe('letter', () => {
            it('should produce an upper or lower case letter', () => {
                const letter = gen.nucleo.letter();
                expect('abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ').to.include(letter);
            })
        })

        describe('letterLower', () => {
            it('should produce a lowercase letter', () => {
                const letter = gen.nucleo.letterLower();
                expect('abcdefghijklmnopqrstuvwxyz').to.include(letter);
            })
        })

        describe('letterUpper', () => {
            it('should produce an uppercase letter', () => {
                const letter = gen.nucleo.letterUpper();
                expect('ABCDEFGIJKLMNOPQRSTUVWXYZ').to.include(letter);
            })
        })

        describe('char', () => {
            it('should produce a char', () => {
                const char = gen.nucleo.char();
                expect('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()')
                    .to.include(char);
            })
        })

        describe('element', () => {
            it('should return an element from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const element = gen.nucleo.element(array);
                expect(array).to.include(element);
            })
        })

        describe('elements', () => {
            it('should return an array of elements from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const elements = gen.nucleo.elements(array);
                elements.forEach(e => expect(array).to.include(e));
            })
        })

        describe('randomElements', () => {
            it('should return an array of elements from the provided array', () => {
                const array = [1, 2, 3, 4, 5];
                const elements = gen.nucleo.randomElements(array);
                elements.forEach(e => expect(array).to.include(e));
            })
        })
    })
})