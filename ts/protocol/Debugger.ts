import {
  TimeStampedPoint,
  ExecutionPoint
} from "./Recording";

/**
 * Unique ID for a source.
 */
export type SourceId = string;

/**
 * Kind of a source.
 * <br>
 * <br><code>inlineScript</code>: Inline contents of a <code>script</code> element.
 * <br><code>scriptSource</code>: Script loaded via the <code>src</code> attribute
 *   of a <code>script</code> element.
 * <br><code>other</code>: An unspecified kind of source. This does not include any
 *   original sources.
 * <br><code>html</code>: An entire HTML page containing one or more inline scripts.
 *   This is an original source whose generated sources are the inline scripts.
 * <br><code>sourceMapped</code>: An original source specified by a source map.
 *   This will have a generated source associated with the source map.
 *   The source map and its sources must have been
 *   associated with the recording via <code>Internal.addRecordingResource</code>.
 * <br><code>prettyPrinted</code>: An original source which was produced by pretty
 *   printing the associated generated source. Pretty printed sources will
 *   automatically be created for other sources which appear to contain minified
 *   code, including HTML page sources. <code>newSource</code> events will be
 *   emitted for a pretty printed source before the generated source.
 * <br><br>
 */
export type SourceKind = "inlineScript" | "scriptSource" | "other" | "html" | "sourceMapped" | "prettyPrinted";

/**
 * Possible content types for sources.
 */
export type ContentType = "text/javascript" | "text/html";

/**
 * Location within a particular source.
 */
export interface SourceLocation {

  /**
   * 1-indexed line in the source.
   */
  line: number;

  /**
   * 0-indexed column in the source.
   */
  column: number;
}

/**
 * Set of locations which are all on the same line of the same source.
 */
export interface SameLineSourceLocations {

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
 * Location within a source.
 */
export interface Location extends SourceLocation {

  sourceId: SourceId;
}

/**
 * A location in a generated source, along with corresponding locations in any
 * original sources which the generated source was source mapped from.
 * The generated location is the first element of the array.
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

export interface findSourcesParameters {

}

export interface findSourcesResult {

}

export interface getSourceContentsParameters {

  /**
   * Source to fetch the contents for.
   */
  sourceId: SourceId;
}

export interface getSourceContentsResult {

  /**
   * Contents of the source.
   */
  contents: string;

  /**
   * Content type of the source contents.
   */
  contentType: ContentType;
}

export interface getPossibleBreakpointsParameters {

  /**
   * Source to return breakpoint locations for.
   */
  sourceId: SourceId;

  /**
   * If specified, earlier breakpoint locations will be excluded.
   */
  begin?: SourceLocation;

  /**
   * If specified, later breakpoint locations will be excluded.
   */
  end?: SourceLocation;
}

export interface getPossibleBreakpointsResult {

  /**
   * All breakpoint locations in the specified source and range.
   */
  lineLocations: SameLineSourceLocations[];
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

export interface blackboxSourceParameters {

  /**
   * Source to blackbox.
   */
  sourceId: SourceId;

  /**
   * If specified, earlier locations will keep their blackbox state.
   */
  begin?: SourceLocation;

  /**
   * If specified, later locations will keep their blackbox state.
   */
  end?: SourceLocation;
}

export interface blackboxSourceResult {

}

export interface unblackboxSourceParameters {

  /**
   * Source to unblackbox.
   */
  sourceId: SourceId;

  /**
   * If specified, earlier locations will keep their blackbox state.
   */
  begin?: SourceLocation;

  /**
   * If specified, later locations will keep their blackbox state.
   */
  end?: SourceLocation;
}

export interface unblackboxSourceResult {

}

/**
 * Describes a source in the recording.
 */
export interface newSource {

  /**
   * ID for the source.
   */
  sourceId: SourceId;

  /**
   * Kind of the source.
   */
  kind: SourceKind;

  /**
   * URL of the source. Omitted for dynamically generated sources (from eval etc.).
   */
  url?: string;

  /**
   * If this is an original source, the IDs of the sources which were generated from
   * this one.
   */
  generatedSourceIds?: SourceId[];
}
