import { Environment } from "./environment";

export abstract class Organism<GenType, DataType, PhenoType, EnvStateType> {
    public connectEnvironment(env: Environment<EnvStateType, GenType, DataType, PhenoType>) {
        env.state.subscribe((state) => {
            env.state.value = this.interact(state);
        });
    }

    public abstract interact(env: EnvStateType): EnvStateType;
}
