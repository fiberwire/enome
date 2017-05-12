import 'mocha';
import { expect } from 'chai';
import { values } from "operators/values";


describe('operators', () => {
    describe('values', () => {
        it('Should produce an array of specified length of random values', () => {
            let vals = values(10);
            expect(vals.length).to.eql(10);
            expect(vals[0]).not.to.eql(vals[1]);
        })
    })
})
