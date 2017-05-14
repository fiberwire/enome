import * as _ from 'lodash';
import { avgFitness } from '../../../../src/operators/avg-fitness';
import { expect } from 'chai';
import { mocks } from '../../../mocks';
import { replenish } from '../../../../src/operators/replenish';
import { safeReproduceManyToMany } from '../../../../src/operators/reproduction/many-to-many/safe-reproduce-many-to-many';
import 'mocha';

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
