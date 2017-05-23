import { avgAge } from '../../../src/operators/parents/avg-age';
import { age } from '../../../src/operators/parents/age';
import { mocks } from '../../mocks';
import { expect } from 'chai';
import 'mocha';

describe('operators', () => {
    describe('parents', () => {
        describe('avgAge', () => {
            let { parent, genome } = mocks();

            it('should return the average age of parents', () => {
                let parent2 = { genome, age: 3 };

                let avg = avgAge([parent, parent2]);

                expect(parent.age).to.eql(1);
                expect(avg).to.eql(2);
            })
        })
    })
})