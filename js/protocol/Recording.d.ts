import { SessionId } from "./Session";
import { ScreenShot } from "./Graphics";
/**
 * Globally unique identifier for a recording.
 */
export declare type RecordingId = string;
export interface RecordingData {
    id: RecordingId;
    url: string;
    title: string;
    duration: number;
    lastScreenData: string;
    lastScreenMimeType: string;
}
/**
 * Unique identifier for the software used to produce a recording.
 */
export declare type BuildId = string;
/**
 * A point in time within a recording, specified as the elapsed time in
 * milliseconds since the recording started. Sub-millisecond resolution
 * is possible.
 */
export declare type TimeStamp = number;
/**
 * Description for a range of time within a recording.
 */
export interface TimeRange {
    begin: TimeStamp;
    end: TimeStamp;
}
/**
 * Identifier for a point within a recording at which the program state can be
 * inspected. Execution points are integers encoded as base-10 numeric strings,
 * such that smaller numbered points precede larger numbered ones. They can be
 * compared by e.g. converting to BigInts and then comparing those BigInts.
 */
export declare type ExecutionPoint = string;
/**
 * An execution point and its associated time stamp. Recordings always have a
 * beginning execution point with value "0" and a time stamp of zero.
 */
export interface TimeStampedPoint {
    point: ExecutionPoint;
    time: TimeStamp;
}
/**
 * A mouse event that occurs somewhere in a recording.
 */
export interface MouseEvent extends TimeStampedPoint {
    /**
     * Kind of mouse event.
     */
    kind: MouseEventKind;
    /**
     * X coordinate of the event, relative to the upper left of the page's main window.
     */
    clientX: number;
    /**
     * Y coordinate of the event, relative to the upper left of the page's main window.
     */
    clientY: number;
}
/**
 * Kinds of mouse events described in a recording.
 */
export declare type MouseEventKind = "mousemove" | "mousedown";
export interface getDescriptionParameters {
    /**
     * Recording to get the description for.
     */
    recordingId: RecordingId;
}
export interface getDescriptionResult {
    /**
     * Duration of the recording.
     */
    duration: TimeStamp;
    /**
     * Byte length of the recording.
     */
    length: number;
    /**
     * Painted graphics at the end of the recording.
     */
    lastScreen?: ScreenShot;
    /**
     * Any command line arguments associated with the recording.
     */
    commandLineArguments?: string[];
}
export interface getMetadataParameters {
    /**
     * Associated recording ID.
     */
    recordingId: RecordingId;
    /**
     * Key for the metadata being accessed.
     */
    key: string;
}
export interface getMetadataResult {
    /**
     * Any value associated with the recording and key.
     */
    value?: string;
}
export interface setMetadataParameters {
    /**
     * Associated recording ID.
     */
    recordingId: RecordingId;
    /**
     * Key for the entry being set.
     */
    key: string;
    /**
     * Value to associate with the recording and key, omitted to delete the
     * key's entry.
     */
    newValue?: string;
    /**
     * Expected current value for the key's entry.
     */
    oldValue?: string;
}
export interface setMetadataResult {
    /**
     * Whether the assignment was performed. The assignment will not be
     * performed if the <code>oldValue</code> parameter did not match the
     * current value of the key's entry.
     */
    updated: boolean;
    /**
     * Current value of the key's entry. If the update was performed, this
     * equals the <code>newValue</code> parameter. Otherwise, this will <b>not</b>
     * equal the <code>oldValue</code> parameter.
     */
    currentValue?: string;
}
export interface metadataStartListeningParameters {
    /**
     * Associated recording ID.
     */
    recordingId: RecordingId;
    /**
     * Key for the metadata entry to listen to.
     */
    key: string;
}
export interface metadataStartListeningResult {
    /**
     * Current value for the entry, as for <code>getMetadata</code>.
     */
    value?: string;
}
export interface metadataStopListeningParameters {
    /**
     * Associated recording ID.
     */
    recordingId: RecordingId;
    /**
     * Key for the metadata entry to listen to.
     */
    key: string;
}
export interface metadataStopListeningResult {
}
export interface createSessionParameters {
    /**
     * Recording to load into the session.
     */
    recordingId: RecordingId;
}
export interface createSessionResult {
    /**
     * Identifier for the new session.
     */
    sessionId: SessionId;
}
export interface releaseSessionParameters {
    /**
     * Session to release.
     */
    sessionId: SessionId;
}
export interface releaseSessionResult {
}
export interface processRecordingParameters {
    recordingId: RecordingId;
}
export interface processRecordingResult {
}
/**
 * Describes a change to an entry in a recording's metadata.
 */
export interface metadataChange {
    /**
     * Associated recording ID.
     */
    recordingId: RecordingId;
    /**
     * Key for the metadata entry which changed.
     */
    key: string;
    /**
     * New value of the metadata entry.
     */
    newValue?: string;
}
/**
 * Describes how much of a recording's data has been uploaded to the cloud service.
 */
export interface uploadedData {
    /**
     * Recording being described.
     */
    recordingId: RecordingId;
    /**
     * How many bytes of recording data have been received by the cloud service.
     */
    uploaded: number;
    /**
     * Total size of the recording in bytes, if known.
     */
    length?: number;
}
/**
 * Emitted when a session has died due to a server side problem.
 */
export interface sessionError {
    /**
     * Session which died.
     */
    sessionId: SessionId;
    /**
     * Numeric code for the error.
     */
    code: number;
    /**
     * Description of the error.
     */
    message: string;
}
