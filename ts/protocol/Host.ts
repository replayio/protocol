import {
  Location,
  ScriptId,
  ScriptLocation
} from "./Debugger";
import {
  ObjectId,
  Value
} from "./Pause";
import {
  MessageSource,
  MessageLevel
} from "./Console";

export interface convertLocationToFunctionOffsetParameters {

  location: Location;
}

export interface convertLocationToFunctionOffsetResult {

  functionId?: string;

  offset?: number;
}

export interface convertFunctionOffsetToLocationParameters {

  functionId: string;

  offset?: number;
}

export interface convertFunctionOffsetToLocationResult {

  location: Location;
}

export interface getStepOffsetsParameters {

  functionId: string;
}

export interface getStepOffsetsResult {

  /**
   * Offsets at which execution should stop when stepping. This is a
   * subset of the breakpoint locations in the function, and may be
   * omitted if execution should stop at all breakpoint locations.
   */
  offsets?: number[];
}

export interface getHTMLSourceParameters {

  url: string;
}

export interface getHTMLSourceResult {

  contents: string;
}

export interface getFunctionsInRangeParameters {

  scriptId: ScriptId;

  begin?: ScriptLocation;

  end?: ScriptLocation;
}

export interface getFunctionsInRangeResult {

  functions: string[];
}

export interface getScriptSourceMapURLParameters {

  scriptId: ScriptId;
}

export interface getScriptSourceMapURLResult {

  url?: string;
}

export interface getSheetSourceMapURLParameters {

  sheet: ObjectId;
}

export interface getSheetSourceMapURLResult {

  url?: string;
}

export interface getCurrentMessageContentsParameters {

}

export interface getCurrentMessageContentsResult {

  source: MessageSource;

  level: MessageLevel;

  text: string;

  url?: string;

  scriptId?: ScriptId;

  line?: number;

  column?: number;

  argumentValues?: Value[];
}

export interface countStackFramesParameters {

}

export interface countStackFramesResult {

  count: number;
}

export interface currentGeneratorIdParameters {

}

export interface currentGeneratorIdResult {

  id?: number;
}
