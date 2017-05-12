
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { fill } from "operators/fill";
import { mocks } from "../mocks";
import { replenish } from "operators/replenish";
import { concat } from "operators/concat";

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