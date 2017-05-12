
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { fill } from "operators/fill";
import { mocks } from "../mocks";
import { replenish } from "operators/replenish";

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