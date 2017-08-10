import { expect } from "chai";
import * as _ from "lodash";
import "mocha";

import { concat, refill } from "../../src/index";
import { mocks } from "../mocks";

describe("operators", () => {
    describe("concat", () => {

        let { genomes } = mocks();

        beforeEach(() => {
            genomes = genomes.map(refill);
        });

        it("should return a genome whose sequence is a concatenation of the provided genomes", () => {
            const [g1, g2] = genomes;
            const g3 = concat(g1, g2);

            expect(g3.sequence.length).to.eql(g1.sequence.length + g2.sequence.length);
        });
    });
});
