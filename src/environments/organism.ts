import { Environment } from "./environment";

export abstract class Organism<GenType, DataType, PhenoType, EnvStateType> {
    public connectEnvironment(env: Environment<EnvStateType, GenType, DataType, PhenoType>) {
        env.state.
    }

    public abstract interact(env: EnvStateType): EnvStateType;
}
