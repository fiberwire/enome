import { best } from '../../../src/operators/best';
import { expect } from 'chai';
import { Genome } from '../../../src/genotypes/genome';
import { GenomeOptions } from '../../../src/options/genome-options';
import { mocks } from '../../mocks';
import { mutate } from '../../../src/operators/mutation/mutate';
import { replenish } from '../../../src/operators/replenish';
import { safeSampledReproduce } from '../../../src/operators/reproduction/safe-sampled-reproduce';
import 'mocha';

describe('operators', () => {
    describe('reproduction', () => {
        describe('safeSampledReproduce', () => {
            let { genome, nsFitness, mutateChance } = mocks();

            beforeEach(() => {
                genome = replenish(genome);
            })

            let mutant: Genome<GenomeOptions> = mutate(genome, mutateChance);
            let offspring: Genome<GenomeOptions> = safeSampledReproduce(genome, mutant, nsFitness, mutateChance = mutateChance);

            it('should produce an offspring genome with genetics from both parents, selected from a sample', () => {
                expect(mutant.sequence.length).to.eql(genome.sequence.length);
                expect(offspring.sequence.length).to.eql(mutant.sequence.length);
            })

            it('should return the offspring if it is better than both parents, otherwise should return the best parent', () => {
                if (nsFitness(offspring).fitness > best([genome, mutant], nsFitness).fitness) {
                    expect(offspring.sequence).to.not.deep.equal(genome.sequence);
                    expect(offspring.sequence).to.not.deep.equal(mutant.sequence);
                }
                else {
                    expect(offspring.sequence).to.deep.equal(best([genome, mutant], nsFitness).genome.sequence);
                }
            })
        })
    })
})

