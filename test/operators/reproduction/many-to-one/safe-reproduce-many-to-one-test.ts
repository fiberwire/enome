import 'mocha';
import { expect } from 'chai';

import * as _ from 'lodash';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { value } from "operators/value";
import { replenish } from "operators/replenish";
import { mocks } from "../../../mocks";
import { safeReproduceManyToOne } from "operators/reproduction/many-to-one/safe-reproduce-many-to-one";
import { top } from "operators/top";
import { best } from "operators/best";


describe('operators', () => {
    describe('reproduction', () => {
        describe('safeReproduceManyToOne', () => {
            let { genomes, fitness, weights } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            let offspring = safeReproduceManyToOne(genomes, weights, fitness);
            let t = top(genomes, 0.5, fitness);
            let offspringFitness = fitness(offspring).fitness;
            let avgFitness = _.meanBy(t, e => e.fitness);
            let b = best(genomes, fitness);

            it('should produce an offspring from many genomes, given a weight array', () => {
                expect(offspring.sequence.length).to.eql(_.meanBy(genomes, g => g.sequence.length));
            })

            it('should return the best parent if the offspring is worse', () => {
                expect(offspringFitness).to.be.at.least(avgFitness);
            })
        })
    })
})
