import * as _ from 'lodash';
import { bottom } from '../../src/operators/bottom';
import { expect } from 'chai';
import { mocks } from '../mocks';
import { Nucleotide } from '../../src/genotypes/nucleotide';
import { replenish } from '../../src/operators/replenish';
import 'mocha';

describe('operators', () => {
    describe('bottom', () => {

        let { genomes, fitness } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        })

        it('should return the worst genomes from the provided array, according to provided fitness function', () => {
            
            //bottom 50% of genomes
            const b = bottom(genomes, 0.5, fitness);

            expect(b.length).to.eql(genomes.length * 0.5);

            //top 50% of genomes
            const sorted = _.sortBy(genomes.map(fitness), e => e.fitness).reverse();
            const t = new Nucleotide(0.5).elements(sorted);

            expect(t.length).to.eql(genomes.length * 0.5);

            const botAvgFitness = _.meanBy(b, e => e.fitness);
            const topAvgFitness = _.meanBy(t, e => e.fitness);

            //top is better on average than bottom
            expect(botAvgFitness).to.be.at.most(topAvgFitness);

        });
    })
})