import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { mocks } from "../../mocks";
import { replenish } from "operators/replenish";

describe('operators', () => {
    describe('mutation', () => {
        describe('mutate', () => {

            let { genome } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            })

            it('should mutate the genome, given a certain mutation chance (per value in sequence)', () => {
                let mutated: Genome<GenomeOptions> = mutate(genome, 0.5);
                expect(mutated.sequence).to.not.deep.equal(genome.sequence);
                expect(mutated.sequence.length).to.equal(genome.sequence.length);
            })
        })
    })
})