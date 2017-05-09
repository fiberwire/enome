export declare class Nucleotide {
    value: number;
    constructor(value: number);
    float(min: number, max: number, value?: number): number;
    int(min: number, max: number, value?: number): number;
    natural(max: number, value?: number): number;
    bool(value?: number): boolean;
    letter(value?: number): string;
    letterLower(value?: number): string;
    letterUpper(value?: number): string;
    char(value?: number): string;
    element<T>(array: T[]): T;
    elements<T>(array: T[]): T[];
    randomElements<T>(array: T[]): T[];
}
