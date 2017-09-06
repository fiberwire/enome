
import * as _ from "lodash";
import { Genome, IGenomeOptions } from "../index";


/**
 * Pads the sequence by copying each value n times.
 * For example: [0.5, 0.25, 0.3] padded with n = 3 would become
 * [0.5, 0.5, 0.5, 0.25, 0.25, 0.25, 0.3, 0.3, 0.3]
 * This is useful for making a genome less sensitive
 * to mutation while keeping the same gene values
 *
 * OR for when you are trying to create a genotype from a phenotype,
 * which will inherently lose information due to gene values being
 * the result of averaging multiple numbers together, which essentially
 * gives it a geneLength of 1.
 *
 * This could turn it from geneLength = 1 to geneLength = n
 *
 * @export
 * @param {number[]} sequence - the sequence you want to pad
 * @returns {number[]} - the padded sequence
 */
export function pad(sequence: number[], n: number): number[] {
  return sequence.map(v => _.range(n).map(i => v)) // copy values n times
    .reduce((prev, curr) => _.concat(prev, curr)); // merge back into a single array
}
