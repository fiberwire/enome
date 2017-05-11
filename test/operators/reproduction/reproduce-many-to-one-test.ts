import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { value } from "operators/value";
import { reproduceManyToOne } from "operators/reproduction/many-to-one/reproduce-many-to-one";


describe('operators/reproduction', () => {
    describe('reproduceManyToOne', () => {
        let gen: Genome<GenomeOptions>;

        beforeEach(() => {
            gen = new Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });
        })

        it('should produce an offspring from many genomes, given a weight array', () => {
            let offspring: Genome<GenomeOptions>;
            it('should accept an array of Genomes', () => {
                let others = _.range(0, 10).map(i => mutate(gen))
                let weights = _.range(0, 10).map(i => value());
                offspring = reproduceManyToOne(_.concat(others, gen), weights);
                expect(offspring.nucleos).to.eql(gen.options.genomeLength);
            })
        })
    })
})

