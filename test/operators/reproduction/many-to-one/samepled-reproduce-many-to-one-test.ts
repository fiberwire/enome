import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { replenish } from "operators/replenish";
import { mocks } from "../../../mocks";
import { sampledReproduceManyToOne } from "operators/reproduction/many-to-one/sampled-reproduce-many-to-one";


describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduceManyToOne', () => {
            let { genomes, fitness, weights } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            let offspring = sampledReproduceManyToOne(genomes, weights, fitness);

            it('should produce an offspring from many genomes, given a weight array, selected from a sample', () => {
                expect(offspring.sequence.length).to.eql(_.meanBy(genomes, g => g.sequence.length));
            })
        })
    })
})
