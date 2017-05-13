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
import { reproduceManyToMany } from "operators/reproduction/many-to-many/reproduce-many-to-many";
import { safeReproduceManyToMany } from "operators/reproduction/many-to-many/safe-reproduce-many-to-many";
import { avgFitness } from "operators/avg-fitness";


describe('operators', () => {
    describe('reproduction', () => {
        describe('safeReproduceManyToMany', () => {
            let { genomes, fitness } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            it('should produce many offspring from many genomes, given a weight array', () => {
                let offspring = safeReproduceManyToMany(genomes, 5, fitness);
                let avgFit = avgFitness(genomes, fitness);

                expect(offspring.length).to.eql(5);

                offspring.forEach(o => {
                    expect(o.nucleos.length).to.eql(genomes[0].options.genomeLength);
                })

                genomes.forEach(g => {
                    offspring.forEach(o => {
                        expect(o.sequence).to.not.deep.equal(g.sequence);
                        expect(fitness(o).fitness).to.be.at.least(avgFit);
                    })
                })
            })
        })
    })
})
