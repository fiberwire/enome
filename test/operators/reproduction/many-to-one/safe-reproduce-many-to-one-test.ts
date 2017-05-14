import * as _ from 'lodash';
import { best } from '../../../../src/operators/best';
import { expect } from 'chai';
import { mocks } from '../../../mocks';
import { replenish } from '../../../../src/operators/replenish';
import { safeReproduceManyToOne } from '../../../../src/operators/reproduction/many-to-one/safe-reproduce-many-to-one';
import { top } from '../../../../src/operators/top';
import 'mocha';

describe('operators', () => {
    describe('reproduction', () => {
        describe('safeReproduceManyToOne', () => {
            let { genomes, fitness } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            let offspring = safeReproduceManyToOne(genomes, fitness);
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
