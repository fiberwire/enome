import { IDisposable } from "rx";
import { Environment } from "./environment";

export abstract class Organism<GenType, DataType, PhenoType, EnvStateType> {

    private envConnection: IDisposable;

    public connectToEnvironment(env: Environment<EnvStateType, GenType, DataType, PhenoType>) {
        this.envConnection = env.state
            .subscribe((state) => {
                env.state.value = this.interact(state);
            });
    }

    public abstract interact(env: EnvStateType): EnvStateType;
}
