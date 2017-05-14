import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rx';
import * as Rx from 'rx';
import {
    best,
    Evaluation,
    Genome,
    GenomeOptions,
    PopulationOptions,
    safeSampledMutateMany,
    safeSampledReproduceManyToMany,
    safeReproduceManyToMany,
    safeMutateMany
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

    evolveStep(): Genome<T>[] {
        let gens = safeReproduceManyToMany(this.genomes, this.genomes.length, this.fitness);
        gens = safeMutateMany(this.genomes, this.fitness);

        return gens;
    }

    evolve(generations: number): Evaluation<T, V> {
        _.range(0, generations).forEach(i => {
            this.genomes = this.evolveStep();
        })

        let b = best(this.genomes, this.fitness);

        return b;
    }

    evolve$(generations: number, timeout: number = 3000): Observable<Evaluation<T, V>> {
        // let i = 1;
        // console.log(`Generation: ${i}`);
        // return Observable.generate(
        //     this.genomes,
        //     gens => i <= generations,
        //     gens => {
        //         this.genomes = this.evolveStep();
        //         i++;
        //         console.log(`Generation: ${i}`);
        //         return this.genomes;
        //     },
        //     gens => best(gens, this.fitness),
        //     Rx.Scheduler.timeout
        // )

        return Observable
            .interval(10)
            .do(i => console.log(`Generation: ${i+1}`))
            .map(i => this.genomes)
            .map(gens => {
                this.genomes = this.evolveStep();
                return this.genomes;
            })
            .map(gens => best(gens, this.fitness))
            .takeWhile(b => b.fitness != Infinity)
            .timeout(timeout)
            .take(generations)
            
    }
}