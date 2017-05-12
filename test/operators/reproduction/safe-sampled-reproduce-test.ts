import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { Nucleotide } from "genotypes/nucleotide";
import { mocks } from "../../mocks";
import { replenish } from "operators/replenish";
import { safeReproduce } from "operators/reproduction/safe-reproduce";
import { best } from "operators/best";
import { safeSampledReproduce } from "operators/reproduction/safe-sampled-reproduce";

describe('operators/reproduction', () => {
    describe('safeSampledReproduce', () => {
        let { genome, fitness, mutateChance } = mocks();

        beforeEach(() => {
            genome = replenish(genome);
        })

        let mutant: Genome<GenomeOptions> = mutate(genome, mutateChance);
        let offspring: Genome<GenomeOptions> = safeSampledReproduce(genome, mutant, fitness, mutateChance = mutateChance);

        it('should produce an offspring genome with genetics from both parents, selected from a sample', () => {
            expect(mutant.sequence.length).to.eql(genome.sequence.length);
            expect(offspring.sequence.length).to.eql(mutant.sequence.length);
        })

        it('should return the offspring if it is better than both parents, otherwise should return the best parent', () => {
            if (fitness(offspring).fitness > best([genome, mutant], fitness).fitness) {
                expect(offspring.sequence).to.not.deep.equal(genome.sequence);
                expect(offspring.sequence).to.not.deep.equal(mutant.sequence);
            }
            else {
                expect(offspring.sequence).to.deep.equal(best([genome, mutant], fitness).genome.sequence);
            }
        })
    })
})

