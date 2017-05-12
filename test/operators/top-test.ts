
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mocks } from "../mocks";
import { replenish } from "operators/replenish";
import { top } from "operators/top";
import { Evaluation } from "evalutation";
import { Nucleotide } from "genotypes/nucleotide";

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
            const sorted = _.sortBy(genomes, (g) => fitness(g).fitness);
            const b = new Nucleotide(0.5).elements(sorted);

            expect(b.length).to.eql(genomes.length * 0.5);

            const topAvgFitness = _.meanBy(t, e => e.fitness);
            const bottomAvgFitness = _.meanBy(b, g => fitness(g).fitness);

            //top is better on average than bottom
            expect(topAvgFitness).to.be.at.least(bottomAvgFitness);

        });
    })
})