
import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mocks } from "../mocks";
import { replenish } from "operators/replenish";
import { clone } from "operators/clone";

describe('operators', () => {
    describe('clone', () => {

        let { genome } = mocks();

        beforeEach(() => {
            genome = replenish(genome);
        })

        it('should return an exact copy of the provided genome', () => {
            let c = clone(genome);
            expect(c).to.deep.equal(genome);
        });
    })
})