import * as _ from 'lodash';
import { expect } from 'chai';
import { mocks } from '../../../mocks';
import { replenish } from '../../../../src/operators/replenish';
import { sampledReproduceManyToMany } from '../../../../src/operators/reproduction/many-to-many/sampled-reproduce-many-to-many';
import 'mocha';

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
