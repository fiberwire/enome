
import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { avg } from "operators/mutation/avg";

describe('operators/mutation', () => {

    let gen: Genome<GenomeOptions>;

    beforeEach(() => {
        gen = new Genome({
            genomeLength: 10,
            nucleotideLength: 1
        });
    })

    describe('avg', () => {
        it('should mutate a genome by averaging mutated values with randomly generated values', () => {
            let mutant = avg(gen, 1);

            expect(mutant.sequence.length).to.eql(gen.sequence.length);
            expect(mutant.sequence).not.to.deep.equal(gen.sequence);
        })
    })
})