import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { refill } from "../../../../src/operators/refill";
import { reproduceManyToOne } from "../../../../src/operators/reproduction/many-to-one/reproduce-many-to-one";
import { mocks } from "../../../mocks";

describe("operators", () => {
    describe("reproduction", () => {
        describe("reproduceManyToOne", () => {
            let { genomes } = mocks();

            beforeEach(() => {
                genomes = genomes.map(refill);
            });

            it("should produce an offspring from many genomes, given a weight array", () => {
                const offspring = reproduceManyToOne(genomes);
                expect(offspring.genes.length).to.eql(genomes[0].options.genomeLength);

                genomes.forEach((g) => {
                    expect(offspring.sequence).to.not.deep.equal(g.sequence);
                });
            });
        });
    });
});
