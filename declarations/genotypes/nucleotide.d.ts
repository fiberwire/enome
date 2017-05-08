export declare class Nucleotide {
    value: number;
    constructor(value: number);
    float(min: number, max: number, value?: number): number;
    int(min: number, max: number, value?: number): number;
    bool(value?: number): boolean;
    letter(value?: number): string;
    element<T>(array: T[]): T;
}
