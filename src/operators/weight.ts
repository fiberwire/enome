import { Chance } from 'chance';
const chance = new Chance();

export function weight(min: number = 0, max: number = 1) {
  return chance.floating({ min, max });
}
