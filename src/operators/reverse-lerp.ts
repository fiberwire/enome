export function reverseLerp(min: number, max: number, t: number): number {
    return (t - min) / (max - min);
}