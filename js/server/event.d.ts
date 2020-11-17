import { metadataChange, uploadedData, sessionError } from "../protocol/Recording";
import { missingRegions, unprocessedRegions, mouseEvents } from "../protocol/Session";
import { paintPoints } from "../protocol/Graphics";
import { newSource } from "../protocol/Debugger";
import { newMessage } from "../protocol/Console";
import { analysisResult, analysisError, analysisPoints } from "../protocol/Analysis";
export interface sendEvent {
    /**
     * Describes a change to an entry in a recording's metadata.
     */
    (event: "Recording.metadataChange", parameters: metadataChange): void;
    /**
     * Describes how much of a recording's data has been uploaded to the cloud service.
     */
    (event: "Recording.uploadedData", parameters: uploadedData): void;
    /**
     * Emitted when a session has died due to a server side problem.
     */
    (event: "Recording.sessionError", parameters: sessionError): void;
    /**
     * Event describing regions of the recording that have not been uploaded.
     */
    (event: "Session.missingRegions", parameters: missingRegions): void;
    /**
     * Event describing regions of the recording that have not been processed.
     */
    (event: "Session.unprocessedRegions", parameters: unprocessedRegions): void;
    /**
     * Describes some mouse events that occur in the recording.
     */
    (event: "Session.mouseEvents", parameters: mouseEvents): void;
    /**
     * Describes some points in the recording at which paints occurred. No paint
     * will occur for the recording's beginning execution point.
     */
    (event: "Graphics.paintPoints", parameters: paintPoints): void;
    /**
     * Describes a source in the recording.
     */
    (event: "Debugger.newSource", parameters: newSource): void;
    /**
     * Describes a console message in the recording.
     */
    (event: "Console.newMessage", parameters: newMessage): void;
    /**
     * Describes some results of an analysis.
     */
    (event: "Analysis.analysisResult", parameters: analysisResult): void;
    /**
     * Describes an error that occurred when running an analysis mapper or reducer
     * function. This will not be emitted for every error, but if there was any
     * error then at least one event will be emitted.
     */
    (event: "Analysis.analysisError", parameters: analysisError): void;
    /**
     * Describes some points at which an analysis will run.
     */
    (event: "Analysis.analysisPoints", parameters: analysisPoints): void;
}
