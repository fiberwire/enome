
export interface GenomeOptions{
    genomeLength: number;
    nucleotideLength: number;
    extendNucleotides: boolean;
    //extendNucleotides:boolean option
    //extendType: string
    //'random' would add random nucleotides when it reaches the end
    //'loop' would just replenish nucleotides when it reaches the end
    //'none' would throw error when it reaches the end
}