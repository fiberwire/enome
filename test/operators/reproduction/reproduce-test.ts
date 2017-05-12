import 'mocha';
import { expect } from 'chai';
import { Genome } from "genotypes/genome";
import { GenomeOptions } from "options/genome-options";
import { mutate } from "operators/mutation/mutate";
import { reproduce } from "operators/reproduction/reproduce";
import { Nucleotide } from "genotypes/nucleotide";
import { mocks } from "../../mocks";
import { replenish } from "operators/replenish";

describe('operators/reproduction', () => {
    describe('reproduce', () => {
        let { genome, mutateChance } = mocks();

        beforeEach(() => {
            genome = replenish(genome);
        })

        it('should produce an offspring genome with genetics from both parents', () => {
            let mutated: Genome<GenomeOptions> = mutate(genome, mutateChance);

            expect(mutated.sequence.length).to.eql(genome.sequence.length);
            expect(mutated.nucleos.length).to.eql(mutated.options.genomeLength)

            let offspring: Genome<GenomeOptions> = reproduce(genome, mutated); //last two parameters are relative weights for each parents chance for their genes to be picked

            expect(offspring.sequence.length).to.eql(mutated.sequence.length);
            expect(offspring.nucleos.length).to.eql(offspring.options.genomeLength);

            let n: Nucleotide = offspring.nucleo;
            expect(n.value).to.be.at.least(0);
            expect(n.value).to.be.at.most(1);

            let i: number = n.int(1, 100);
            expect(i).to.be.at.least(1);
            expect(i).to.be.at.most(100);

            expect(genome).not.to.eql(mutated);
            expect(genome).not.to.eql(offspring);
            expect(mutated).not.to.eql(offspring);
        })
    })
})

