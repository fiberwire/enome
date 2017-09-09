
export function lerp(min: number, max: number, t: number): number {
    return min - (max - min) * t;
}