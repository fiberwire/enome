import 'mocha';
import { expect } from 'chai';
import { mocks } from "../mocks";
import { avgFitness } from "operators/avg-fitness";

import * as _ from 'lodash';

describe('operators', () => {

    let { genomes, fitness } = mocks();

    describe('avgFitness', () => {
        it('should return the average fitness for a given array of genomes, using a given fitness function', () => {
            let avgFit = avgFitness(genomes, fitness);

            expect(avgFit).to.eql(_.meanBy(genomes, g => fitness(g).fitness));
        })
    })
})