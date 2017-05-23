import { age } from '../../../src/operators/parents/age';
import { mocks } from '../../mocks';
import { expect } from 'chai';
import 'mocha';

describe('operators', () => {
    describe('parents', () => {
        describe('age', () => {
            let { parent } = mocks();
            it('should increase parents age', () => {
                let age1 = parent.age;
                age(parent);
                let age2 = parent.age;

                expect(age2).to.be.above(age1);
            })
        })
    })
})