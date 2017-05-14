import { mocks } from '../../mocks';
import { replenish } from '../../../src/operators/replenish';
import { Genome } from '../../../src/genotypes/genome';
import { GenomeOptions } from '../../../src/options/genome-options';
import { mutate } from '../../../src/operators/mutation/mutate';
import { sampledReproduce } from '../../../src/operators/reproduction/sampled-reproduce';
import 'mocha';
import { expect } from 'chai';

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

