import { avg } from '../../../src/operators/mutation/avg';
import { expect } from 'chai';
import { mocks } from '../../mocks';
import { replenish } from '../../../src/operators/replenish';
import 'mocha';

describe('operators', () => {
    describe('mutation', () => {

        let { genome } = mocks();

        beforeEach(() => {
            genome = replenish(genome)
        })

        describe('avg', () => {
            it('should mutate a genome by averaging mutated values with randomly generated values', () => {
                let mutant = avg(genome, 1);

                expect(mutant.sequence.length).to.eql(genome.sequence.length);
                expect(mutant.sequence).not.to.deep.equal(genome.sequence);
            })
        })
    })
})