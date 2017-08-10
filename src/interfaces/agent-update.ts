
import { IStateUpdate } from "../index";

export interface IAgentUpdate<StateType> extends IStateUpdate<StateType> {
    agentID: string;
}
