import { expect } from 'chai';
import 'mocha';
import { values } from '../../src/index';

describe('operators', () => {
  describe('values', () => {
    it('Should produce an array of specified length of random values', () => {
      const vals = values(10);
      expect(vals.length).to.eql(10);
      expect(vals[0]).not.to.eql(vals[1]);
    });
  });
});
