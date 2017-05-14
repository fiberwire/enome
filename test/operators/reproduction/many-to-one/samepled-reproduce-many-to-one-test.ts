import * as _ from 'lodash';
import { expect } from 'chai';
import { mocks } from '../../../mocks';
import { replenish } from '../../../../src/operators/replenish';
import { sampledReproduceManyToOne } from '../../../../src/operators/reproduction/many-to-one/sampled-reproduce-many-to-one';
import 'mocha';

describe('operators', () => {
    describe('reproduction', () => {
        describe('sampledReproduceManyToOne', () => {
            let { genomes, fitness } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            let offspring = sampledReproduceManyToOne(genomes, fitness);

            it('should produce an offspring from many genomes, given a weight array, selected from a sample', () => {
                expect(offspring.sequence.length).to.eql(_.meanBy(genomes, g => g.sequence.length));
            })
        })
    })
})
