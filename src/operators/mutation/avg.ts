
import { GenomeOptions, Genome } from "../../index";
import { value } from "../value";

export function avg<T extends GenomeOptions>(gen: Genome<T>, mutateChance: number): Genome<T> {
        return new Genome(
            gen.options,
            gen.sequence.map(v => {
                if (value() <= mutateChance) {
                    return (value() + v) / 2
                }
                else {
                    return v;
                }
            })
        )
    }