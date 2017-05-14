import * as _ from 'lodash';
import { clone } from '../../src/operators/clone';
import { expect } from 'chai';
import { mocks } from '../mocks';
import { replenish } from '../../src/operators/replenish';
import 'mocha';

describe('operators', () => {
    describe('clone', () => {

        let { genome } = mocks();

        beforeEach(() => {
            genome = replenish(genome);
        })

        it('should return an exact copy of the provided genome', () => {
            let c = clone(genome);
            expect(c).to.deep.equal(genome);
        });
    })
})