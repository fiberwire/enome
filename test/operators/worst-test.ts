
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mocks } from "../mocks";
import { replenish } from "operators/replenish";
import { worst } from "operators/worst";

describe('operators', () => {
    describe('worst', () => {

        let { genomes, fitness } = mocks();

        beforeEach(() => {
            genomes = genomes.map(replenish);
        })

        it('should return the worst genome from the provided array, according to provided fitness function', () => {
            let w = worst(genomes, fitness);
            
            let worse = genomes.filter(g => fitness(g).fitness < w.fitness);

            expect(worse.length).to.eql(0);
        });
    })
})