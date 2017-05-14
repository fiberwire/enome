import { expect } from 'chai';
import { Genome } from '../../../src/genotypes/genome';
import { GenomeOptions } from '../../../src/options/genome-options';
import { mocks } from '../../mocks';
import { mutate } from '../../../src/operators/mutation/mutate';
import { replenish } from '../../../src/operators/replenish';
import { reproduce } from '../../../src/operators/reproduction/reproduce';
import 'mocha';


describe('operators', () => {
    describe('reproduction', () => {
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
})

