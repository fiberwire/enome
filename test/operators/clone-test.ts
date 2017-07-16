import { expect } from "chai";
import * as _ from "lodash";
import "mocha";

import { clone, refresh } from "../../src/index";
import { mocks } from "../mocks";

describe("operators", () => {
    describe("clone", () => {

        let { genome } = mocks();

        beforeEach(() => {
            genome = refresh(genome);
        });

        it("should return an exact copy of the provided genome", () => {
            const c = clone(genome);
            expect(c).to.eql(genome);
        });
    });
});
