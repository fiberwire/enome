import * as _ from 'lodash';
import { expect } from 'chai';
import { mocks } from '../../../mocks';
import { replenish } from '../../../../src/operators/replenish';
import { reproduceManyToMany } from '../../../../src/operators/reproduction/many-to-many/reproduce-many-to-many';
import 'mocha';

describe('operators', () => {
    describe('reproduction', () => {
        describe('reproduceManyToMany', () => {
            let { genomes } = mocks();

            beforeEach(() => {
                genomes = genomes.map(replenish);
            })

            it('should produce many offspring from many genomes, given a weight array', () => {
                let offspring = reproduceManyToMany(genomes, 5);

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
