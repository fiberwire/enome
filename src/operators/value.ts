import { Chance } from 'chance';
const chance = new Chance();

export function value(min: number = 0, max: number = 1) {
  return chance.floating({ min: 0, max: 1 });
}
