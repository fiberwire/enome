import { replenish } from '../../src/operators/replenish';
import 'mocha';
import { expect } from 'chai';
import { mocks } from "../mocks";



describe('operators', () => {

    let { genome } = mocks();

    describe('replenish', () => {
        it('should return a new genome with replenished nucleos', () => {
            let n = genome.nucleo;

            expect(genome.nucleos.length).to.eql(genome.nucleotides.length - 1);
            
            genome = replenish(genome);

            expect(genome.nucleos.length).to.eql(genome.nucleotides.length);
        })
    })
})