import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { Nucleotide } from "genotypes/nucleotide";
import { mocks } from "../../mocks";
import { replenish } from "operators/replenish";
import { sampledReproduce } from "operators/reproduction/sampled-reproduce";

describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduce', () => {
            let { genome, mutateChance, fitness } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            })

            let mutated: Genome<GenomeOptions> = mutate(genome, mutateChance);
            let offspring: Genome<GenomeOptions> = sampledReproduce(genome, mutated, fitness);

            it('should produce an offspring genome with genetics from both parents, selected from a sample', () => {
                expect(mutated.sequence.length).to.eql(genome.sequence.length);
                expect(offspring.sequence.length).to.eql(mutated.sequence.length);

                expect(genome.sequence).to.not.deep.equal(mutated.sequence);
                expect(genome.sequence).to.not.deep.equal(offspring.sequence);
                expect(mutated.sequence).to.not.deep.equal(offspring.sequence);
            })
        })
    })
})

