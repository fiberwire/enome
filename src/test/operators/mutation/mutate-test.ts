import 'mocha';
import { expect } from 'chai';
import { Genome, GenomeOptions, mutate } from "../../../index";

describe('operators/mutation', () => {
    describe('mutate', () => {

        let gen: Genome<GenomeOptions>;

        beforeEach(() => {
            gen = new Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });
        })

        it('should mutate the genome, given a certain mutation chance (per value in sequence)', () => {
            let mutated: Genome<GenomeOptions> = mutate(gen, 0.5);
            expect(mutated.sequence).not.to.deep.equal(gen.sequence);
            expect(mutated.sequence.length).to.equal(gen.sequence.length);
        })
    })
})