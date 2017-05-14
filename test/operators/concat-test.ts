import * as _ from 'lodash';
import { concat } from '../../src/operators/concat';
import { expect } from 'chai';
import { mocks } from '../mocks';
import { replenish } from '../../src/operators/replenish';
import 'mocha';

describe('operators', () => {
    describe('concat', () => {

        let { genomes } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        })

        it('should return a genome whose sequence is a concatenation of the provided genomes', () => {
            let [g1, g2] = genomes;
            let g3 = concat(g1, g2);

            expect(g3.sequence.length).to.eql(g1.sequence.length + g2.sequence.length);
        });
    })
})