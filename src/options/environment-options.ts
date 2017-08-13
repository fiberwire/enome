import { UpdateType } from "../index";

export interface IEnvironmentOptions {
    interactionRate?: number;
    updateType?: UpdateType;
    historyLength?: number;
}
