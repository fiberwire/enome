import { IArtificialSelectionOptions } from "./artificial-selection-options";

export interface IArtificialPooledSelectionOptions extends IArtificialSelectionOptions {
    minParentPoolSize: number;
    maxParentPoolSize: number;
}
