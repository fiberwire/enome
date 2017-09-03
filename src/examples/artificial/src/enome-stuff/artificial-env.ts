import { ArtificialSelection, IArtificialEState } from '../../../../index';
import { IArtGenOptions } from "./art-gen-options";

export class ArtificialEnv
    extends ArtificialSelection<
    IArtGenOptions,
    string,
    IArtificialAState,
    IArtificialEState<IArtGenOptions, string> {

}