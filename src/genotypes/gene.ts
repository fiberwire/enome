import * as Chance from 'chance';
import * as _ from 'lodash';
import { lerp, reverseLerp } from "../index";

const chance = new Chance();

export class Gene {
  public static reverseFloat(min: number, max: number, float: number): number {
    return reverseLerp(min, max, float);
  }

  public static reverseInt(min: number, max: number, int: number): number {
    const i = Math.round(int);
    return reverseLerp(min, max, i);
  }

  public static reverseNatural(
    min: number,
    max: number,
    natural: number
  ): number {
    const n = Math.max(0, natural);
    return reverseLerp(min, max, n);
  }

  public static reverseBool(bool: boolean): number {
    // in case avg is being used instead of sub as the mutation op,
    // returning 0.75 for true and 0.25 for false will prevent it from
    // being overly insensitive to change relative to 1 for true and 0 for false
    if (bool) {
      return 0.75;
    } else {
      return 0.25;
    }
  }

  public static reverseLetter(letter: string): number {
    if (letter.length !== 1) {
      throw new Error('letter.length must equal 1');
    }

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split(
      ''
    );

    return this.reverseElement(letter, letters);
  }

  public static reverseLetterLower(letter: string): number {
    if (letter.length !== 1) {
      throw new Error('letter.length must equal 1');
    }

    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return this.reverseElement(letter, letters);
  }

  public static reverseLetterUpper(letter: string): number {
    if (letter.length !== 1) {
      throw new Error('letter.length must equal 1');
    }

    const letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');

    return this.reverseElement(letter, letters);
  }

  public static reverseLetterOrSpace(letter: string): number {
    if (letter.length !== 1) {
      throw new Error('letter.length must equal 1');
    }

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ '.split(
      ''
    );
    return this.reverseElement(letter, letters);
  }

  public static reverseChar(char: string): number {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'.split(
      ''
    );
    return this.reverseElement(char, chars);
  }

  // does reverse int on the index of the element in the array
  public static reverseElement<T>(element: T, array: T[]): number {
    const index = array.indexOf(element);
    return this.reverseInt(0, array.length, index);
  }

  public static reverseElements<T>(elements: T[], array: T[]): number {
    return this.reverseInt(0, array.length, elements.length);
  }

  constructor(public value: number = chance.floating({ min: 0, max: 1 })) { }

  // returns a float, interpolated based on this.value
  public float(min: number, max: number, t: number = this.value): number {
    return lerp(min, max, t);
  }

  // returns an integer, interpolated based on this.value
  public int(min: number, max: number, t: number = this.value): number {
    return Math.round(lerp(min, max, t));
  }

  // returns a natural number, interpolated based on this.value
  public natural(min: number, max: number, t: number = this.value): number {
    return Math.max(0, this.int(min, max, t));
  }

  // returns a boolean, interpolated based on this.value
  public bool(t: number = this.value): boolean {
    return this.element([true, false], t);
  }

  // returns an upper or lower case letter, interpolated based on this.value
  public letter(t: number = this.value): string {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ'.split(
      ''
    );
    return this.element(letters, t);
  }

  // returns an upper or lower case letter or a space, interpolated based on this.value
  public letterOrSpace(t: number = this.value): string {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ '.split(
      ''
    );
    return this.element(letters, t);
  }

  // returns a lower case letter, interpolated based on this.value
  public letterLower(t: number = this.value): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return this.element(letters, t);
  }

  // returns an upper case letter, interpolated based on this.value
  public letterUpper(t: number = this.value): string {
    const letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'.split('');
    return this.element(letters, t);
  }

  // returns a character, interpolated based on this.value
  public char(t: number = this.value): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'.split(
      ''
    );
    return this.element(chars, t);
  }

  // returns an element of the given array, interpolated based on this.value;
  public element<T>(array: T[], t: number = this.value): T {
    return array[this.int(0, array.length - 1, t)];
  }

  // returns a number of elements of the given array, the number of elements is interpolated based on this.value
  public elements<T>(array: T[], t: number = this.value): T[] {
    return _.take(array, this.int(0, array.length, t));
  }

  // returns a number of randomly selected elements of the given array,
  // the number of elements is interpolated based on this.value
  public randomElements<T>(array: T[], t: number = this.value): T[] {
    return _.take(chance.shuffle(array), this.int(0, array.length, t));
  }
}
