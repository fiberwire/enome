import 'mocha';
import { expect } from 'chai';
import { Genome } from "../../../src/genotypes/genome";
import { GenomeOptions } from "../../../src/options/genome-options";
import { mutate } from "../../../src/operators/mutation/mutate";
import { reproduce } from "../../../src/operators/reproduction/reproduce";
import { Nucleotide } from "../../../src/genotypes/nucleotide";

describe('operators/reproduction', () => {
    describe('reproduce', () => {
        let gen: Genome<GenomeOptions>;

        beforeEach(() => {
            gen = new Genome({
                genomeLength: 10,
                nucleotideLength: 1
            });
        })

        it('should produce an offspring genome with genetics from both parents', () => {
            let mutated: Genome<GenomeOptions> = mutate(gen, 0.5);

            expect(mutated.sequence.length).to.eql(gen.sequence.length);
            expect(mutated.nucleos.length).to.eql(mutated.options.genomeLength)

            let offspring: Genome<GenomeOptions> = reproduce(gen, mutated); //last two parameters are relative weights for each parents chance for their genes to be picked

            expect(offspring.sequence.length).to.eql(mutated.sequence.length);
            expect(offspring.nucleos.length).to.eql(offspring.options.genomeLength);

            let n: Nucleotide = offspring.nucleo;
            expect(n.value).to.be.at.least(0);
            expect(n.value).to.be.at.most(1);

            let i: number = n.int(1, 100);
            expect(i).to.be.at.least(1);
            expect(i).to.be.at.most(100);

            expect(gen).not.to.eql(mutated);
            expect(gen).not.to.eql(offspring);
            expect(mutated).not.to.eql(offspring);
        })
    })
})

