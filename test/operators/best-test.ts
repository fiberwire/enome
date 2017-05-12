
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { fill } from "operators/fill";
import { mocks } from "../mocks";
import { replenish } from "operators/replenish";
import { best } from "operators/best";

describe('operators', () => {
    describe('best', () => {

        let { genomes, fitness } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        })

        it('should return the best genome from the provided array, according to provided fitness function', () => {
            let b = best(genomes, fitness);
            
            let better = genomes.filter(g => fitness(g).fitness > b.fitness);

            expect(better.length).to.eql(0);
        });
    })
})