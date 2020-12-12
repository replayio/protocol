import { TimeRange, MouseEvent, TimeStampedPoint, ExecutionPoint } from "./Recording";
import { PauseId, CallStack, PauseData } from "./Pause";
/**
 * Unique identifier for a session which a recording has been loaded into.
 */
export declare type SessionId = string;
/**
 * Level at which a recording can be processed. After <code>basic</code>
 * processing, all console messages, sources, paints, and mouse events will
 * be available immediately. After <code>executionIndexed</code> processing,
 * analyses will be able to run, resume/step targets can be found, and the
 * state associated with different <code>Pause.PauseId</code> identifiers
 * can be inspected.
 */
export declare type ProcessingLevel = "basic" | "executionIndexed";
export interface ensureProcessedParameters {
    /**
     * Level at which the recording should be processed before returning.
     * Defaults to <code>basic</code> if omitted.
     */
    level?: ProcessingLevel;
}
export interface ensureProcessedResult {
}
export interface findMouseEventsParameters {
}
export interface findMouseEventsResult {
}
export interface getEndpointParameters {
}
export interface getEndpointResult {
    endpoint: TimeStampedPoint;
}
export interface createPauseParameters {
    /**
     * Point to create the pause at.
     */
    point: ExecutionPoint;
}
export interface createPauseResult {
    /**
     * Identifier for the new pause.
     */
    pauseId: PauseId;
    /**
     * Stack contents, omitted if there are no frames on the stack at this point.
     */
    stack?: CallStack;
    /**
     * Data describing the frames on the stack and the in scope
     * variables of the topmost frame.
     */
    data: PauseData;
}
export interface releasePauseParameters {
    pauseId: PauseId;
}
export interface releasePauseResult {
}
/**
 * Event describing regions of the recording that have not been uploaded.
 */
export interface missingRegions {
    /**
     * Regions that have not been uploaded.
     */
    regions: TimeRange[];
}
/**
 * Event describing regions of the recording that have not been processed.
 */
export interface unprocessedRegions {
    /**
     * Level at which the regions are unprocessed.
     */
    level: ProcessingLevel;
    /**
     * Regions of the recording that haven't been processed at the associated
     * level.
     */
    regions: TimeRange[];
}
/**
 * Describes some mouse events that occur in the recording.
 */
export interface mouseEvents {
    events: MouseEvent[];
}
