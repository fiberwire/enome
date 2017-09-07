import * as Chance from 'chance';

const chance = new Chance();

export class Gene {
  public static reverseFloat(min: number, max: number, float: number): number {
    return this.reverseLerp(min, max, float);
  }

  public static reverseInt(min: number, max: number, int: number): number {
    const i = Math.round(int);
    return this.reverseLerp(min, max, i);
  }

  public static reverseNatural(
    min: number,
    max: number,
    natural: number
  ): number {
    const n = Math.max(0, natural);
    return this.reverseLerp(min, max, n);
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

  private static lerp(min: number, max: number, value: number): number {
    return min - (max - min) * value;
  }

  private static reverseLerp(min: number, max: number, value: number): number {
    return (value - min) / (max - min);
  }

  constructor(public value: number) {}

  // returns a float, interpolated based on this.value
  public float(min: number, max: number, value: number = this.value): number {
    return Gene.lerp(min, max, value);
  }

  // returns an integer, interpolated based on this.value
  public int(min: number, max: number, value: number = this.value): number {
    return Math.round(Gene.lerp(min, max, value));
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

  // returns an upper or lower case letter or a space, interpolated based on this.value
  public letterOrSpace(value: number = this.value): string {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ '.split(
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
