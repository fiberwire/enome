import * as Chance from 'chance';
import * as d3 from 'd3-interpolate';

const chance = new Chance();

export class Gene {
  constructor(public value: number) {}

  // returns a float, interpolated based on this.value
  public float(min: number, max: number, value: number = this.value): number {
    return d3.interpolateNumber(min, max)(value);
  }

  // returns an integer, interpolated based on this.value
  public int(min: number, max: number, value: number = this.value): number {
    return d3.interpolateRound(min, max)(value);
  }

  // returns a natural number, interpolated based on this.value
  public natural(min: number, max: number, value: number = this.value): number {
    return Math.max(0, this.int(min, max, value));
  }

  // returns a boolean, interpolated based on this.value
  public bool(value: number = this.value): boolean {
    return this.element([true, false], value);
  }

  // returns an upper or lower case letter, interpolated based on this.value
  public letter(value: number = this.value): string {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split(
      ''
    );
    return this.element(letters, value);
  }

  // returns a lower case letter, interpolated based on this.value
  public letterLower(value: number = this.value): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return this.element(letters, value);
  }

  // returns an upper case letter, interpolated based on this.value
  public letterUpper(value: number = this.value): string {
    const letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
    return this.element(letters, value);
  }

  // returns a character, interpolated based on this.value
  public char(value: number = this.value): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'.split(
      ''
    );
    return this.element(chars, value);
  }

  // returns an element of the given array, interpolated based on this.value;
  public element<T>(array: T[], value: number = this.value): T {
    return array[this.int(0, array.length - 1, value)];
  }

  // returns a number of elements of the given array, the number of elements is interpolated based on this.value
  public elements<T>(array: T[], value: number = this.value): T[] {
    return array.slice(0, this.int(0, array.length, value));
  }

  // returns a number of randomly selected elements of the given array,
  // the number of elements is interpolated based on this.value
  public randomElements<T>(array: T[], value: number = this.value): T[] {
    return chance.shuffle(array).slice(0, this.int(0, array.length, value));
  }
}
