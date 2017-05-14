import * as _ from 'lodash';
import { expect } from 'chai';
import { mocks } from '../../mocks';
import { replenish } from '../../../src/operators/replenish';
import { sampledMutate } from '../../../src/operators/mutation/sampled-mutate';
import 'mocha';

describe('operators', () => {
    describe('mutation', () => {
        describe('sampledMutate', () => {

            let { genome, fitness, mutateChance } = mocks()

            beforeEach(() => {
                genome = replenish(genome);
            });

            it('should return the best of a sample of mutated genomes', () => {
                let mutant = sampledMutate(genome, fitness, 5, mutateChance);

                expect(mutant.sequence.length).to.equal(genome.sequence.length);
                expect(mutant.sequence).to.not.deep.equal(genome.sequence);
            })
        })
    })
})