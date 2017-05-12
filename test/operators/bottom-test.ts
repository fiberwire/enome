
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mocks } from "../mocks";
import { replenish } from "operators/replenish";
import { Evaluation } from "evalutation";
import { Nucleotide } from "genotypes/nucleotide";
import { bottom } from "operators/bottom";

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