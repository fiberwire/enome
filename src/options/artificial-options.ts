import { IAgentEnvironmentOptions } from "enviro-rx";

export interface IArtificialOptions extends IAgentEnvironmentOptions {
  parents: number;
  specimens: number;
}
