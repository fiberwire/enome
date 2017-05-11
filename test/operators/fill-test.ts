
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';

import { Genome } from "../../src/genotypes/genome";
import { GenomeOptions } from "../../src/options/genome-options";
import { fill } from "../../src/operators/fill";

describe('operators', () => {
    describe('fill', () => {

        let gens: Genome<GenomeOptions>[];

        beforeEach(() => {
            gens = _.range(1, 5).map(i => new Genome({
                genomeLength: 10,
                nucleotideLength: 1
            }));
        })

        it('should return a new array of genomes filled to a certain number with offspring of parents from original array', () => {
            let f = fill(gens, 10);
            expect(f.length).to.eql(10);
        });
    })
})