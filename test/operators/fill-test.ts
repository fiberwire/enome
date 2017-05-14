import { fill } from '../../src/operators/fill';
import { replenish } from '../../src/operators/replenish';

import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { mocks } from "../mocks";

describe('operators', () => {
    describe('fill', () => {

        let { genomes } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        })

        it('should return a new array of genomes filled to a certain number with offspring of parents from original array', () => {
            let f = fill(genomes, 20);
            expect(f.length).to.eql(20);
        });
    })
})