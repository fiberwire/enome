import * as _ from "lodash";
import { BehaviorSubject, ControlledObservable, Observable } from "rx";
import { FillType } from "../enums/fill-type";
import { FitnessObjective } from "../enums/fitness-objective";
import { MutateType } from "../enums/mutate-type";
import { ReproduceType } from "../enums/reproduce-type";
import {
    best,
    generateGenomes,
    Genome,
    IEvaluation,
    IGenomeOptions,
    mutateMany,
    NaturalSelectionOptions,
    reproduceManyToMany,
    safeMutateMany,
    safeReproduceManyToMany,
    safeSampledMutateMany,
    safeSampledReproduceManyToMany,
    sampledMutateMany,
    sampledReproduceManyToMany,
} from "../index";
import { bottom } from "../operators/bottom";
import { fillRandom } from "../operators/fill-random";
import { fillWorst } from "../operators/fill-worst";
import { worst } from "../operators/worst";

export class NaturalSelection<T extends IGenomeOptions, U extends NaturalSelectionOptions, V> {
    public genomes: Array<Genome<T>>;

    constructor(
        public popOptions: U,
        public genOptions: T,
        public create: (gen: Genome<T>) => V,
        public fitness: (gen: Genome<T>) => IEvaluation<T, V>,
    ) {
        this.genomes = generateGenomes(this.popOptions.populationSize, this.genOptions);
    }

    public reproduce(gens: Array<Genome<T>>): Array<Genome<T>> {

        switch (this.popOptions.reproduceOptions.type) {
            case ReproduceType.safeSampled:
                gens = safeSampledReproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                    this.fitness,
                    this.popOptions.objective,
                    this.popOptions.reproduceOptions.sampleSize,
                );
                break;

            case ReproduceType.safe:
                gens = safeReproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                    this.fitness,
                    this.popOptions.objective,
                );
                break;

            case ReproduceType.sampled:
                gens = sampledReproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                    this.fitness,
                    this.popOptions.reproduceOptions.sampleSize,
                );
                break;

            case ReproduceType.normal:
                gens = reproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                );
                break;

            default:
                gens = safeReproduceManyToMany(
                    this.genomes,
                    this.genomes.length,
                    this.fitness,
                    this.popOptions.objective,
                );
                break;
        }
        return gens;
    }

    public mutate(gens: Array<Genome<T>>): Array<Genome<T>> {
        switch (this.popOptions.mutateOptions.type) {
            case MutateType.safeSampled:
                return safeSampledMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.objective,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateOp,
                    this.popOptions.mutateOptions.sampleSize,
                );
            case MutateType.safe:
                return safeMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.objective,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateOp,
                );
            case MutateType.sampled:
                return sampledMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.objective,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateOp,
                    this.popOptions.mutateOptions.sampleSize,
                );
            case MutateType.normal:
                return mutateMany(
                    this.genomes,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateOp,
                );
            default:
                return safeMutateMany(
                    this.genomes,
                    this.fitness,
                    this.popOptions.mutateOptions.mutateChance,
                    this.popOptions.mutateOptions.mutateOp,
                );
        }
    }

    public fill(gens: Array<Genome<T>>): Array<Genome<T>> {
        switch (this.popOptions.fillType) {
            case FillType.worst:
                return fillWorst(gens, this.fitness, this.popOptions.fillPercent);
            case FillType.random:
                return fillRandom(gens, this.popOptions.fillPercent);
            case FillType.none:
                return gens;
            default:
                return fillWorst(gens, this.fitness, this.popOptions.fillPercent);
        }
    }

    public evolveStep(): Array<Genome<T>> {
        let gens: Array<Genome<T>>;

        gens = this.reproduce(this.genomes);
        gens = this.mutate(gens);
        gens = this.fill(gens);

        return gens;
    }

    public evolve(generations: number): IEvaluation<T, V> {
        _.range(generations).forEach((i) => {
            this.genomes = this.evolveStep();
        });

        const b = best(this.genomes, this.fitness);

        return b;
    }

    public evolve$(generations: number = 1000, timeout: number = 3000): Observable<IEvaluation<T, V>> {
        return Observable
            .interval(1)
            .map((i) => this.genomes)
            .map((gens) => {
                this.genomes = this.evolveStep();
                return this.genomes;
            })
            .map((gens) => {
                switch (this.popOptions.objective) {
                    case FitnessObjective.maximize:
                        return best(gens, this.fitness);

                    case FitnessObjective.minimize:
                        return worst(gens, this.fitness);
                }
            })
            .take(generations);
    }
}
