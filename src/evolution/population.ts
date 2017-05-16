import { fillRandom } from '../operators/fill-random';
import { fillWorst } from '../operators/fill-worst';
import { bottom } from '../operators/bottom';
import { worst } from '../operators/worst';
import * as _ from 'lodash';
import { BehaviorSubject, ControlledObservable, Observable } from 'rx';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    mutateMany,
    PopulationOptions,
    reproduceManyToMany,
    safeMutateMany,
    safeReproduceManyToMany,
    safeSampledMutateMany,
    safeSampledReproduceManyToMany,
    sampledMutateMany,
    sampledReproduceManyToMany
} from '../index';

export class Population<T extends GenomeOptions, U extends PopulationOptions, V> {
    genomes: Genome<T>[];

    constructor(
        public popOptions: U,
        public genOptions: T,
        public create: (gen: Genome<T>) => V,
        public fitness: (gen: Genome<T>) => Evaluation<T, V>
    ) {
        this.genomes = _.range(0, popOptions.populationSize)
            .map(i => new Genome(genOptions));
    }

    reproduce(gens: Genome<T>[]): Genome<T>[] {
        switch ({ safe: this.popOptions.reproduceOptions.safe, sampled: this.popOptions.reproduceOptions.sampled }) {

            case { safe: true, sampled: true }:
                gens = safeSampledReproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                    this.fitness,
                    this.popOptions.reproduceOptions.sampleSize
                );
                break;
            case { safe: true, sampled: false }:
                gens = safeReproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                    this.fitness
                );
                break;
            case { safe: false, sampled: true }:
                gens = sampledReproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                    this.fitness,
                    this.popOptions.reproduceOptions.sampleSize
                );
                break;
            case { safe: false, sampled: false }:
                gens = reproduceManyToMany(
                    this.genomes,
                    this.genomes.length
                );
                break;
            default:
                gens = safeReproduceManyToMany(this.genomes,
                    this.genomes.length,
                    this.fitness
                );
                break;
        }
        return gens;
    }

    mutate(gens: Genome<T>[]): Genome<T>[] {
        switch ({ safe: this.popOptions.mutateOptions.safe, sampled: this.popOptions.mutateOptions.sampled }) {
            case { safe: true, sampled: true }:
                return safeSampledMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateType,
                    this.popOptions.mutateOptions.sampleSize
                );
            case { safe: true, sampled: false }:
                return safeMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateType
                );
            case { safe: false, sampled: true }:
                return sampledMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateType,
                    this.popOptions.mutateOptions.sampleSize
                );
            case { safe: false, sampled: false }:
                return mutateMany(
                    this.genomes,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateType
                );
            default:
                return safeMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateType
                );
        }
    }

    fill(gens: Genome<T>[]): Genome<T>[] {
        switch (this.popOptions.fillType) {
            case 'worst':
                return fillWorst(gens, this.fitness, this.popOptions.fillPercent);
            case 'random':
                return fillRandom(gens, this.popOptions.fillPercent);
            default:
                return fillWorst(gens, this.fitness, this.popOptions.fillPercent);
        }
    }

    evolveStep(): Genome<T>[] {
        let gens: Genome<T>[];

        gens = this.reproduce(this.genomes);
        gens = this.mutate(gens);
        gens = this.fill(gens);

        return gens;
    }

    evolve(generations: number): Evaluation<T, V> {
        _.range(generations).forEach(i => {
            this.genomes = this.evolveStep();
        })

        let b = best(this.genomes, this.fitness);

        return b;
    }

    evolve$(generations: number = 1000, timeout: number = 3000): Observable<Evaluation<T, V>> {
        return Observable
            .interval(1)
            .do(i => console.log(`Generation: ${i + 1}`))
            .map(i => this.genomes)
            .map(gens => {
                this.genomes = this.evolveStep();
                return this.genomes;
            })
            .map(gens => best(gens, this.fitness))
            .take(generations)
    }
}