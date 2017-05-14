import * as _ from 'lodash';
import { expect } from 'chai';
import { mocks } from '../mocks';
import { Nucleotide, replenish, top } from '../../src/index';
import 'mocha';


describe('operators', () => {
    describe('top', () => {

        let { genomes, fitness } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        })

        it('should return the best genomes from the provided array, according to provided fitness function', () => {
            
            //top 50% of genomes
            const t = top(genomes, 0.5, fitness);

            expect(t.length).to.eql(genomes.length * 0.5);

            //bottom 50% of genomes
            const sorted = _.sortBy(genomes.map(fitness), e => e.fitness);
            const b = new Nucleotide(0.5).elements(sorted);

            expect(b.length).to.eql(genomes.length * 0.5);

            const topAvgFitness = _.meanBy(t, e => e.fitness);
            const botAvgFitness = _.meanBy(b, e => e.fitness);

            //top is better on average than bottom
            expect(topAvgFitness).to.be.at.least(botAvgFitness);

        });
    })
})