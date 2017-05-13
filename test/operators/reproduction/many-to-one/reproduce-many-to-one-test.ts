import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { value } from "operators/value";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";
import { replenish } from "operators/replenish";
import { mocks } from "../../../mocks";


describe('operators', () => {
    describe('reproduction', () => {
        describe('reproduceManyToOne', () => {
            let { genomes } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            it('should produce an offspring from many genomes, given a weight array', () => {
                let offspring = reproduceManyToOne(genomes);
                expect(offspring.nucleos.length).to.eql(genomes[0].options.genomeLength);

                genomes.forEach(g => {
                    expect(offspring.sequence).to.not.deep.equal(g.sequence);
                })
            })
        })
    })
})
