import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { value } from "operators/value";
import { replenish } from "operators/replenish";
import { mocks } from "../../../mocks";
import { reproduceManyToMany } from "operators/reproduction/many-to-many/reproduce-many-to-many";
import { sampledReproduceManyToMany } from "operators/reproduction/many-to-many/sampled-reproduce-many-to-many";


describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduceManyToMany', () => {
            let { genomes, fitness } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            it('should produce many offspring from many genomes, given a weight array', () => {
                let offspring = sampledReproduceManyToMany(genomes, 5, fitness);

                offspring.forEach(o => {
                    expect(o.nucleos.length).to.eql(genomes[0].options.genomeLength);
                })


                genomes.forEach(g => {
                    offspring.forEach(o => {
                        expect(o.sequence).to.not.deep.equal(g.sequence);
                    })
                })
            })
        })
    })
})
