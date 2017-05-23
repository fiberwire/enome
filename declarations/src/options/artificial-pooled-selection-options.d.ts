import { ArtificialSelectionOptions } from './artificial-selection-options';
export interface ArtificialPooledSelectionOptions extends ArtificialSelectionOptions {
    minParentPoolSize: number;
    maxParentPoolSize: number;
}
