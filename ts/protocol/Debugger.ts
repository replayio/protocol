import {
  TimeStampedPoint,
  ExecutionPoint
} from "./Recording";

/**
 * Unique ID for a script.
 */
export type ScriptId = string;

/**
 * Kind of a script.
 * <br>
 * <br><code>inlineScript</code>: Inline contents of a <code>script</code> element.
 * <br><code>scriptSource</code>: Script loaded via the <code>src</code> attribute
 *   of a <code>script</code> element.
 * <br><code>other</code>: An unspecified kind of script. This does not include any
 *   original scripts.
 * <br><code>html</code>: An entire HTML page containing one or more inline scripts.
 *   This is an original script whose generated scripts are the inline scripts.
 * <br><code>sourceMapped</code>: A source script specified by a source map.
 *   This is an original script whose generated script is associated with the source map.
 *   Source mapped scripts are only available when the source map and its sources have been
 *   associated with the recording via <code>Internal.addRecordingResource</code>.
 * <br><code>prettyPrinted</code>: An original script which was produced by pretty
 *   printing the associated generated script. Pretty printed scripts will
 *   automatically be created for other scripts which appear to contain minified
 *   code, including HTML page scripts. <code>scriptParsed</code> events will be
 *   emitted for a pretty printed script before the generated script.
 * <br><br>
 */
export type ScriptKind = "inlineScript" | "scriptSource" | "other" | "html" | "sourceMapped" | "prettyPrinted";

/**
 * Possible content types for script sources.
 */
export type ContentType = "text/javascript" | "text/html";

/**
 * Location within a particular script.
 */
export interface ScriptLocation {

  /**
   * 1-indexed line in the script's source.
   */
  line: number;

  /**
   * 0-indexed column in the script's source.
   */
  column: number;
}

/**
 * Set of locations which are all on the same line of the same script.
 */
export interface SameLineScriptLocations {

  /**
   * Common line number for the locations.
   */
  line: number;

  /**
   * Different column numbers for the locations.
   */
  columns: number[];
}

/**
 * Location within a script.
 */
export interface Location extends ScriptLocation {

  scriptId: ScriptId;
}

/**
 * A location in a generated scripts, along with corresponding locations in any
 * original scripts which the generated script was source mapped from.
 * The generated script location is the first element of the array.
 */
export type MappedLocation = Location[];

/**
 * ID for a breakpoint.
 */
export type BreakpointId = string;

/**
 * Reasons why execution can pause when running forward or backward through
 * the recording.
 * <br>
 * <br><code>endpoint</code>: Ran to the beginning or end of the recording.
 * <br><code>breakpoint</code>: Hit an installed breakpoint.
 * <br><code>debuggerStatement</code>: Hit a debugger statement.
 * <br><code>step</code>: Reached the target of a step operation.
 * <br><br>
 */
export type PauseReason = "endpoint" | "breakpoint" | "debuggerStatement" | "step";

/**
 * Description of an execution point.
 */
export interface PointDescription extends TimeStampedPoint {

  /**
   * Location of the topmost frame, omitted if there are no frames on stack.
   */
  frame?: MappedLocation;
}

/**
 * Description of a point where execution can pause after running forward or
 * backward through the recording.
 */
export interface PauseDescription extends PointDescription {

  /**
   * Reason for pausing.
   */
  reason: PauseReason;
}

export interface findScriptsParameters {

}

export interface findScriptsResult {

}

export interface getScriptSourceParameters {

  /**
   * Script to fetch the source for.
   */
  scriptId: ScriptId;
}

export interface getScriptSourceResult {

  /**
   * Source contents of the script.
   */
  scriptSource: string;

  /**
   * Content type of the source contents.
   */
  contentType: ContentType;
}

export interface getPossibleBreakpointsParameters {

  /**
   * Script to return breakpoint locations for.
   */
  scriptId: ScriptId;

  /**
   * If specified, earlier breakpoint locations will be excluded.
   */
  begin?: ScriptLocation;

  /**
   * If specified, later breakpoint locations will be excluded.
   */
  end?: ScriptLocation;
}

export interface getPossibleBreakpointsResult {

  /**
   * All breakpoint locations in the specified script and range.
   */
  lineLocations: SameLineScriptLocations[];
}

export interface getMappedLocationParameters {

  location: Location;
}

export interface getMappedLocationResult {

  mappedLocation: MappedLocation;
}

export interface setBreakpointParameters {

  /**
   * Location to set the breakpoint at.
   */
  location: Location;

  /**
   * Any condition which must evaluate to a non-falsy value for an execution
   * point to hit the breakpoint.
   */
  condition?: string;
}

export interface setBreakpointResult {

  /**
   * ID for the new breakpoint.
   */
  breakpointId: BreakpointId;
}

export interface removeBreakpointParameters {

  breakpointId: BreakpointId;
}

export interface removeBreakpointResult {

}

export interface findResumeTargetParameters {

  /**
   * Point to start the resume from.
   */
  point: ExecutionPoint;
}

export interface findResumeTargetResult {

  /**
   * Point where execution should pause.
   */
  target: PauseDescription;
}

export interface findRewindTargetParameters {

  /**
   * Point to start rewinding from.
   */
  point: ExecutionPoint;
}

export interface findRewindTargetResult {

  /**
   * Point where execution should pause.
   */
  target: PauseDescription;
}

export interface findReverseStepOverTargetParameters {

  /**
   * Point to start reverse-stepping from.
   */
  point: ExecutionPoint;
}

export interface findReverseStepOverTargetResult {

  /**
   * Point where execution should pause.
   */
  target: PauseDescription;
}

export interface findStepOverTargetParameters {

  /**
   * Point to start stepping from.
   */
  point: ExecutionPoint;
}

export interface findStepOverTargetResult {

  /**
   * Point where execution should pause.
   */
  target: PauseDescription;
}

export interface findStepInTargetParameters {

  /**
   * Point to start stepping from.
   */
  point: ExecutionPoint;
}

export interface findStepInTargetResult {

  /**
   * Point where execution should pause.
   */
  target: PauseDescription;
}

export interface findStepOutTargetParameters {

  /**
   * Point to step out from.
   */
  point: ExecutionPoint;
}

export interface findStepOutTargetResult {

  /**
   * Point where execution should pause.
   */
  target: PauseDescription;
}

export interface blackboxScriptParameters {

  /**
   * Script to blackbox.
   */
  scriptId: ScriptId;

  /**
   * If specified, earlier locations will keep their blackbox state.
   */
  begin?: ScriptLocation;

  /**
   * If specified, later locations will keep their blackbox state.
   */
  end?: ScriptLocation;
}

export interface blackboxScriptResult {

}

export interface unblackboxScriptParameters {

  /**
   * Script to unblackbox.
   */
  scriptId: ScriptId;

  /**
   * If specified, earlier locations will keep their blackbox state.
   */
  begin?: ScriptLocation;

  /**
   * If specified, later locations will keep their blackbox state.
   */
  end?: ScriptLocation;
}

export interface unblackboxScriptResult {

}

/**
 * Describes a script that was successfully parsed.
 */
export interface scriptParsed {

  /**
   * ID for the script.
   */
  scriptId: ScriptId;

  /**
   * Kind of script.
   */
  kind: ScriptKind;

  /**
   * URL of the script. Omitted for dynamically generated scripts (from eval etc.).
   */
  url?: string;

  /**
   * If this is an original script, the IDs of the scripts which were generated from
   * this one.
   */
  generatedScriptIds?: ScriptId[];
}
