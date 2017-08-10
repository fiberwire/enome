import { expect } from "chai";
import "mocha";
import { value } from "../../src/index";

describe("operators", () => {
    describe("value", () => {
        it("Should produce a random value between 0 and 1", () => {
            const val = value();

            expect(val).to.be.at.least(0);
            expect(val).to.be.at.most(1);
        });
    });
});
