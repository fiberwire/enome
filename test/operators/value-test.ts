import 'mocha';
import { expect } from 'chai';
import { value } from "operators/value";


describe('operators', () => {
    describe('value', () => {
        it('Should produce a random value between 0 and 1', () => {
            let val = value();
            
            expect(val).to.be.at.least(0);
            expect(val).to.be.at.most(1);
        })
    })
})
