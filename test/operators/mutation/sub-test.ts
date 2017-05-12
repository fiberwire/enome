
import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { sub } from "operators/mutation/sub";
import { replenish } from "operators/replenish";
import { mocks } from "../../mocks";

describe('operators/mutation', () => {

    let { genome } = mocks();

    beforeEach(() => {
        genome = replenish(genome);
    })

    describe('sub', () => {
        it('should mutate a genome by replacing values with randomly generated values', () => {
            let mutant = sub(genome, 1);

            expect(mutant.sequence.length).to.eql(genome.sequence.length);
            expect(mutant.sequence).not.to.deep.equal(genome.sequence);
        })
    })
})