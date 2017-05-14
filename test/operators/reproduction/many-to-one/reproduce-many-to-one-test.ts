import * as _ from 'lodash';
import { expect } from 'chai';
import { mocks } from '../../../mocks';
import { replenish } from '../../../../src/operators/replenish';
import { reproduceManyToOne } from '../../../../src/operators/reproduction/many-to-one/reproduce-many-to-one';
import 'mocha';

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
