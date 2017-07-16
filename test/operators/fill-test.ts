import { fill, refresh } from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as _ from "lodash";
import { mocks } from "../mocks";

describe("operators", () => {
    describe("fill", () => {

        let { genomes } = mocks();

        beforeEach(() => {
            genomes = genomes.map(refresh);
        });

        it("should return a new array of genomes filled with offspring of parents from original array",
        () => {
            const f = fill(genomes, 20);
            expect(f.length).to.eql(20);
        });
    });
});
