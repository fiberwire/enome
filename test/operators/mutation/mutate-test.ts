import { expect } from 'chai';
import { Genome } from '../../../src/genotypes/genome';
import { GenomeOptions } from '../../../src/options/genome-options';
import { mocks } from '../../mocks';
import { mutate } from '../../../src/operators/mutation/mutate';
import { replenish } from '../../../src/operators/replenish';
import 'mocha';

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