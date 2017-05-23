import * as _ from 'lodash';
import { best } from '../../src/operators/best';
import { expect } from 'chai';
import { mocks } from '../mocks';
import { replenish } from '../../src/operators/replenish';
import 'mocha';

describe('operators', () => {
    describe('best', () => {

        let { genomes, nsFitness } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        })

        it('should return the best genome from the provided array, according to provided fitness function', () => {
            let b = best(genomes, nsFitness);
            
            let better = genomes.filter(g => nsFitness(g).fitness > b.fitness);

            expect(better.length).to.eql(0);
        });
    })
})