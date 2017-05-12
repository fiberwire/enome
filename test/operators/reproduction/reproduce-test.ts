import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { reproduce } from "operators/reproduction/reproduce";
import { Nucleotide } from "genotypes/nucleotide";
import { mocks } from "../../mocks";
import { replenish } from "operators/replenish";

describe('operators/reproduction', () => {
    describe('reproduce', () => {
        let { genome, mutateChance } = mocks();

        beforeEach(() => {
            genome = replenish(genome);
        })

        let mutated: Genome<GenomeOptions> = mutate(genome, mutateChance);
        let offspring: Genome<GenomeOptions> = reproduce(genome, mutated);

        it('should produce an offspring genome with genetics from both parents', () => {
            expect(mutated.sequence.length).to.eql(genome.sequence.length);
            expect(offspring.sequence.length).to.eql(mutated.sequence.length);

            expect(genome.sequence).to.not.deep.equal(mutated.sequence);
            expect(genome.sequence).to.not.deep.equal(offspring.sequence);
            expect(mutated.sequence).to.not.deep.equal(offspring.sequence);
        })
    })
})

