import { metadataChange, uploadedData, sessionError, getDescriptionParameters, getMetadataParameters, setMetadataParameters, metadataStartListeningParameters, metadataStopListeningParameters, createSessionParameters, releaseSessionParameters, processRecordingParameters } from "../protocol/Recording";
import { missingRegions, unprocessedRegions, mouseEvents, ensureProcessedParameters, findMouseEventsParameters, getEndpointParameters, createPauseParameters, releasePauseParameters } from "../protocol/Session";
import { paintPoints, findPaintsParameters, getPaintContentsParameters, getDevicePixelRatioParameters } from "../protocol/Graphics";
import { newSource, findSourcesParameters, getSourceContentsParameters, getPossibleBreakpointsParameters, getMappedLocationParameters, setBreakpointParameters, removeBreakpointParameters, findResumeTargetParameters, findRewindTargetParameters, findReverseStepOverTargetParameters, findStepOverTargetParameters, findStepInTargetParameters, findStepOutTargetParameters, blackboxSourceParameters, unblackboxSourceParameters } from "../protocol/Debugger";
import { newMessage, findMessagesParameters } from "../protocol/Console";
import { evaluateInFrameParameters, evaluateInGlobalParameters, getObjectPropertyParameters, callFunctionParameters, callObjectPropertyParameters, getObjectPreviewParameters, getScopeParameters, getTopFrameParameters, getAllFramesParameters, getFrameArgumentsParameters, getFrameStepsParameters, getExceptionValueParameters } from "../protocol/Pause";
import { getDocumentParameters, getParentNodesParameters, querySelectorParameters, getEventListenersParameters, getBoxModelParameters, getBoundingClientRectParameters, getAllBoundingClientRectsParameters, performSearchParameters } from "../protocol/DOM";
import { getComputedStyleParameters, getAppliedRulesParameters } from "../protocol/CSS";
import { analysisResult, analysisError, analysisPoints, createAnalysisParameters, addLocationParameters, addFunctionEntryPointsParameters, addRandomPointsParameters, addEventHandlerEntryPointsParameters, addExceptionPointsParameters, runAnalysisParameters, releaseAnalysisParameters, findAnalysisPointsParameters } from "../protocol/Analysis";
import { convertLocationToFunctionOffsetParameters, convertFunctionOffsetToLocationParameters, getStepOffsetsParameters, getHTMLSourceParameters, getFunctionsInRangeParameters, getSourceMapURLParameters, getSheetSourceMapURLParameters, getCurrentMessageContentsParameters, countStackFramesParameters, currentGeneratorIdParameters, topFrameLocationParameters } from "../protocol/Target";
import { createRecordingParameters, setRecordingMetadataParameters, addRecordingDataParameters, addRecordingDescriptionParameters, hasResourceParameters, addResourceParameters, addRecordingResourceParameters, echoParameters, labelTestSessionParameters, getRecordingsParameters } from "../protocol/Internal";
import { GenericProtocolClient } from "./generic";
export declare class ProtocolClient {
    private readonly genericClient;
    constructor(genericClient: GenericProtocolClient);
    /**
     * The Recording domain defines methods for managing recordings.
     */
    Recording: {
        /**
         * Describes a change to an entry in a recording's metadata.
         */
        addMetadataChangeListener: (listener: (parameters: metadataChange) => void) => void;
        removeMetadataChangeListener: () => void;
        /**
         * Describes how much of a recording's data has been uploaded to the cloud service.
         */
        addUploadedDataListener: (listener: (parameters: uploadedData) => void) => void;
        removeUploadedDataListener: () => void;
        /**
         * Emitted when a session has died due to a server side problem.
         */
        addSessionErrorListener: (listener: (parameters: sessionError) => void) => void;
        removeSessionErrorListener: () => void;
        /**
         * Get a description of a recording.
         */
        getDescription: (parameters: getDescriptionParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").getDescriptionResult>;
        /**
         * Get an entry in a recording's metadata key/value store.
         */
        getMetadata: (parameters: getMetadataParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").getMetadataResult>;
        /**
         * Set an entry in a recording's metadata.
         */
        setMetadata: (parameters: setMetadataParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").setMetadataResult>;
        /**
         * Listen for changes to an entry in a recording's metadata. When listening,
         * <code>metadataChange</code> events will be emitted whenever the entry's
         * value changes.
         */
        metadataStartListening: (parameters: metadataStartListeningParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").metadataStartListeningResult>;
        /**
         * Stop listening for changes to an entry in a recording's metadata.
         */
        metadataStopListening: (parameters: metadataStopListeningParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").metadataStopListeningResult>;
        /**
         * Create a session for inspecting a recording. This command does not return
         * until the recording's contents have been fully received. If the contents
         * are incomplete, <code>uploadedData</code> events will be periodically
         * emitted before the command returns. After creating, a <code>sessionError</code>
         * events may be emitted later if the session dies unexpectedly.
         */
        createSession: (parameters: createSessionParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").createSessionResult>;
        /**
         * Release a session and allow its resources to be reclaimed.
         */
        releaseSession: (parameters: releaseSessionParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").releaseSessionResult>;
        /**
         * Begin processing a recording, even if no sessions have been created for it.
         * After calling this, sessions created for the recording (on this connection,
         * or another) may start in a partially or fully processed state and start
         * being used immediately.
         */
        processRecording: (parameters: processRecordingParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Recording").processRecordingResult>;
    };
    /**
     * The Session domain defines methods for using recording sessions. In order to
     * inspect a recording, it must first be loaded into a session via
     * <code>Recording.createSession</code>.
     *
     * After the session is created, it may be in an unprocessed or partially
     * processed state. As documented, some commands do not return until the session
     * has fully processed the recording. Processing starts automatically after the
     * session is created.
     *
     * <br><br>All commands and events in this domain must include a <code>sessionId</code>.
     */
    Session: {
        /**
         * Event describing regions of the recording that have not been uploaded.
         */
        addMissingRegionsListener: (listener: (parameters: missingRegions) => void) => void;
        removeMissingRegionsListener: () => void;
        /**
         * Event describing regions of the recording that have not been processed.
         */
        addUnprocessedRegionsListener: (listener: (parameters: unprocessedRegions) => void) => void;
        removeUnprocessedRegionsListener: () => void;
        /**
         * Describes some mouse events that occur in the recording.
         */
        addMouseEventsListener: (listener: (parameters: mouseEvents) => void) => void;
        removeMouseEventsListener: () => void;
        /**
         * Does not return until the recording is fully processed. Before returning,
         * <code>missingRegions</code> and <code>unprocessedRegions</code> events will
         * be periodically emitted. Commands which require inspecting the recording
         * will not return until that part of the recording has been processed,
         * see <code>ProcessingLevel</code> for details.
         */
        ensureProcessed: (parameters: ensureProcessedParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Session").ensureProcessedResult>;
        /**
         * Find all points in the recording at which a mouse move or click occurred.
         * Does not return until the recording is fully processed. Before returning,
         * <code>mouseEvents</code> events will be periodically emitted. The union
         * of all these events describes all mouse events in the recording.
         */
        findMouseEvents: (parameters: findMouseEventsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Session").findMouseEventsResult>;
        /**
         * Get the last execution point in the recording.
         */
        getEndpoint: (parameters: getEndpointParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Session").getEndpointResult>;
        /**
         * Create a pause describing the state at an execution point.
         */
        createPause: (parameters: createPauseParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Session").createPauseResult>;
        /**
         * Release a pause and allow its resources to be reclaimed.
         */
        releasePause: (parameters: releasePauseParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Session").releasePauseResult>;
    };
    /**
     * The Graphics domain defines methods for accessing a recording's graphics data.
     *
     * <br><br>All commands and events in this domain must include a <code>sessionId</code>.
     */
    Graphics: {
        /**
         * Describes some points in the recording at which paints occurred. No paint
         * will occur for the recording's beginning execution point.
         */
        addPaintPointsListener: (listener: (parameters: paintPoints) => void) => void;
        removePaintPointsListener: () => void;
        /**
         * Find all points in the recording at which paints occurred. Does not return
         * until the recording is fully processed. Before returning,
         * <code>paintPoints</code> events will be periodically emitted. The union
         * of all these events describes all paint points in the recording.
         */
        findPaints: (parameters: findPaintsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Graphics").findPaintsResult>;
        /**
         * Get the graphics at a point where a paint occurred.
         */
        getPaintContents: (parameters: getPaintContentsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Graphics").getPaintContentsResult>;
        /**
         * Get the value of <code>window.devicePixelRatio</code>. This is the ratio of
         * pixels in screen shots to pixels used by DOM/CSS data such as
         * <code>DOM.getBoundingClientRect</code>.
         */
        getDevicePixelRatio: (parameters: getDevicePixelRatioParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Graphics").getDevicePixelRatioResult>;
    };
    /**
     * The Debugger domain defines methods for accessing sources in the recording
     * and navigating around the recording using breakpoints, stepping, and so forth.
     *
     * <br><br>All commands and events in this domain must include a <code>sessionId</code>.
     */
    Debugger: {
        /**
         * Describes a source in the recording.
         */
        addNewSourceListener: (listener: (parameters: newSource) => void) => void;
        removeNewSourceListener: () => void;
        /**
         * Find all sources in the recording. Does not return until the recording is
         * fully processed. Before returning, <code>newSource</code> events will be
         * emitted for every source in the recording.
         */
        findSources: (parameters: findSourcesParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").findSourcesResult>;
        /**
         * Get the contents of a source.
         */
        getSourceContents: (parameters: getSourceContentsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").getSourceContentsResult>;
        /**
         * Get a compact representation of the locations where breakpoints can be set
         * in a region of a source.
         */
        getPossibleBreakpoints: (parameters: getPossibleBreakpointsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").getPossibleBreakpointsResult>;
        /**
         * Get the mapped location for a source location.
         */
        getMappedLocation: (parameters: getMappedLocationParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").getMappedLocationResult>;
        /**
         * Set a breakpoint at a location.
         */
        setBreakpoint: (parameters: setBreakpointParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").setBreakpointResult>;
        /**
         * Remove a breakpoint.
         */
        removeBreakpoint: (parameters: removeBreakpointParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").removeBreakpointResult>;
        /**
         * Find where to pause when running forward from a point.
         */
        findResumeTarget: (parameters: findResumeTargetParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").findResumeTargetResult>;
        /**
         * Find where to pause when rewinding from a point.
         */
        findRewindTarget: (parameters: findRewindTargetParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").findRewindTargetResult>;
        /**
         * Find where to pause when reverse-stepping from a point.
         */
        findReverseStepOverTarget: (parameters: findReverseStepOverTargetParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").findReverseStepOverTargetResult>;
        /**
         * Find where to pause when stepping from a point.
         */
        findStepOverTarget: (parameters: findStepOverTargetParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").findStepOverTargetResult>;
        /**
         * Find where to pause when stepping from a point and stopping at the entry of
         * any encountered call.
         */
        findStepInTarget: (parameters: findStepInTargetParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").findStepInTargetResult>;
        /**
         * Find where to pause when stepping out from a frame to the caller.
         */
        findStepOutTarget: (parameters: findStepOutTargetParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").findStepOutTargetResult>;
        /**
         * Blackbox a source or a region in it. Resume commands like
         * <code>findResumeTarget</code> will not return execution points in
         * blackboxed regions of a source.
         */
        blackboxSource: (parameters: blackboxSourceParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").blackboxSourceResult>;
        /**
         * Unblackbox a source or a region in it.
         */
        unblackboxSource: (parameters: unblackboxSourceParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Debugger").unblackboxSourceResult>;
    };
    /**
     * The Console domain defines methods for accessing messages reported to the console.
     *
     * <br><br>All commands and events in this domain must include a <code>sessionId</code>.
     */
    Console: {
        /**
         * Describes a console message in the recording.
         */
        addNewMessageListener: (listener: (parameters: newMessage) => void) => void;
        removeNewMessageListener: () => void;
        /**
         * Find all messages in the recording. Does not return until the recording is
         * fully processed. Before returning, <code>newMessage</code> events will be
         * emitted for every console message in the recording.
         */
        findMessages: (parameters: findMessagesParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Console").findMessagesResult>;
    };
    /**
     * The Pause domain is used to inspect the state of the program when it is paused
     * at particular execution points.
     *
     * <br><br>All commands and events in this domain must include both a <code>sessionId</code>
     * and a <code>pauseId</code>.
     */
    Pause: {
        /**
         * Evaluate an expression in the context of a call frame. This command is
         * effectful.
         */
        evaluateInFrame: (parameters: evaluateInFrameParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").evaluateInFrameResult>;
        /**
         * Evaluate an expression in a global context. This command is effectful.
         */
        evaluateInGlobal: (parameters: evaluateInGlobalParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").evaluateInGlobalResult>;
        /**
         * Read a property from an object. This command is effectful.
         */
        getObjectProperty: (parameters: getObjectPropertyParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getObjectPropertyResult>;
        /**
         * Call a function object. This command is effectful.
         */
        callFunction: (parameters: callFunctionParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").callFunctionResult>;
        /**
         * Read a property from an object, then call the result. This command is effectful.
         */
        callObjectProperty: (parameters: callObjectPropertyParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").callObjectPropertyResult>;
        /**
         * Load a preview for an object.
         */
        getObjectPreview: (parameters: getObjectPreviewParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getObjectPreviewResult>;
        /**
         * Load a scope's contents.
         */
        getScope: (parameters: getScopeParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getScopeResult>;
        /**
         * Get the topmost frame on the stack.
         */
        getTopFrame: (parameters: getTopFrameParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getTopFrameResult>;
        /**
         * Get all frames on the stack.
         */
        getAllFrames: (parameters: getAllFramesParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getAllFramesResult>;
        /**
         * Get the values of a frame's arguments.
         */
        getFrameArguments: (parameters: getFrameArgumentsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getFrameArgumentsResult>;
        /**
         * Get the points of all steps that are executed by a frame.
         */
        getFrameSteps: (parameters: getFrameStepsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getFrameStepsResult>;
        /**
         * Get any exception that is being thrown at this point.
         */
        getExceptionValue: (parameters: getExceptionValueParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Pause").getExceptionValueResult>;
    };
    /**
     * The DOM domain is used to inspect the DOM at particular execution points.
     * Inspecting the DOM requires a <code>Pause.PauseId</code>, and DOM nodes
     * are identified by a <code>Pause.ObjectId</code>.
     *
     * <br><br>All commands and events in this domain must include both a <code>sessionId</code>
     * and a <code>pauseId</code>.
     */
    DOM: {
        /**
         * Get the page's root document.
         */
        getDocument: (parameters: getDocumentParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").getDocumentResult>;
        /**
         * Load previews for an object and its transitive parents up to the
         * root document.
         */
        getParentNodes: (parameters: getParentNodesParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").getParentNodesResult>;
        /**
         * Call querySelector() on a node in the page.
         */
        querySelector: (parameters: querySelectorParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").querySelectorResult>;
        /**
         * Get the event listeners attached to a node in the page.
         */
        getEventListeners: (parameters: getEventListenersParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").getEventListenersResult>;
        /**
         * Get boxes for a node.
         */
        getBoxModel: (parameters: getBoxModelParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").getBoxModelResult>;
        /**
         * Get the bounding client rect for a node.
         */
        getBoundingClientRect: (parameters: getBoundingClientRectParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").getBoundingClientRectResult>;
        /**
         * Get the bounding client rect for all elements on the page.
         */
        getAllBoundingClientRects: (parameters: getAllBoundingClientRectsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").getAllBoundingClientRectsResult>;
        /**
         * Search the DOM for nodes containing a string.
         */
        performSearch: (parameters: performSearchParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/DOM").performSearchResult>;
    };
    /**
     * The CSS domain is used to inspect the CSS state at particular execution points.
     *
     * <br><br>All commands and events in this domain must include both a <code>sessionId</code>
     * and a <code>pauseId</code>.
     */
    CSS: {
        /**
         * Get the styles computed for a node.
         */
        getComputedStyle: (parameters: getComputedStyleParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/CSS").getComputedStyleResult>;
        /**
         * Get the style rules being applied to a node.
         */
        getAppliedRules: (parameters: getAppliedRulesParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/CSS").getAppliedRulesResult>;
    };
    /**
     * The Analysis domain is used to efficiently analyze the program state at many
     * execution points. Analysis specifications are based on the MapReduce
     * algorithm: a map operation is performed on all the execution points of
     * interest, and the results are reduced to a summary afterwards.
     *
     * <br><br>The life cycle of an analysis is as follows. First, use <code>createAnalysis</code>
     * to create the analysis and specify its map and reduce operations. Next, use one
     * or more other commands to specify the set of execution points to apply the
     * analysis to. Finally, use <code>runAnalysis</code> to start running the
     * analysis and generate <code>analysisResult</code> events.
     *
     * <br><br>Currently, analyses can only be applied to one session/recording.
     * This restriction will be relaxed in the future.
     */
    Analysis: {
        /**
         * Describes some results of an analysis.
         */
        addAnalysisResultListener: (listener: (parameters: analysisResult) => void) => void;
        removeAnalysisResultListener: () => void;
        /**
         * Describes an error that occurred when running an analysis mapper or reducer
         * function. This will not be emitted for every error, but if there was any
         * error then at least one event will be emitted.
         */
        addAnalysisErrorListener: (listener: (parameters: analysisError) => void) => void;
        removeAnalysisErrorListener: () => void;
        /**
         * Describes some points at which an analysis will run.
         */
        addAnalysisPointsListener: (listener: (parameters: analysisPoints) => void) => void;
        removeAnalysisPointsListener: () => void;
        /**
         * Start specifying a new analysis.
         */
        createAnalysis: (parameters: createAnalysisParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").createAnalysisResult>;
        /**
         * Apply the analysis to every point where a source location executes.
         */
        addLocation: (parameters: addLocationParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").addLocationResult>;
        /**
         * Apply the analysis to every function entry point in a region of a source.
         */
        addFunctionEntryPoints: (parameters: addFunctionEntryPointsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").addFunctionEntryPointsResult>;
        /**
         * Apply the analysis to a random selection of points.
         */
        addRandomPoints: (parameters: addRandomPointsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").addRandomPointsResult>;
        /**
         * Apply the analysis to the entry point of every handler for an event.
         */
        addEventHandlerEntryPoints: (parameters: addEventHandlerEntryPointsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").addEventHandlerEntryPointsResult>;
        /**
         * Apply the analysis to every point where an exception is thrown.
         */
        addExceptionPoints: (parameters: addExceptionPointsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").addExceptionPointsResult>;
        /**
         * Run the analysis. After this is called, <code>analysisResult</code> and/or
         * <code>analysisError</code> events will be emitted as results are gathered.
         * Does not return until the analysis has finished and all events have been
         * emitted.
         */
        runAnalysis: (parameters: runAnalysisParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").runAnalysisResult>;
        /**
         * Release an analysis and its server side resources. If the analysis is
         * running, it will be canceled, preventing further <code>analysisResult</code>
         * and <code>analysisError</code> events from being emitted.
         */
        releaseAnalysis: (parameters: releaseAnalysisParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").releaseAnalysisResult>;
        /**
         * Find the set of execution points at which an analysis will run. After this
         * is called, <code>analysisPoints</code> events will be emitted as the points
         * are found. Does not return until events for all points have been emitted.
         * Can only be used after the analysis has started running.
         */
        findAnalysisPoints: (parameters: findAnalysisPointsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Analysis").findAnalysisPointsResult>;
    };
    /**
     * The Target domain includes commands that are sent by the Record Replay Driver
     * to the target application which it is attached to. Protocol clients should
     * not use this domain. See https://replay.io/driver for more information.
     */
    Target: {
        /**
         * Get the function ID / offset to use for a source location, if there is one.
         */
        convertLocationToFunctionOffset: (parameters: convertLocationToFunctionOffsetParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").convertLocationToFunctionOffsetResult>;
        /**
         * Get the location to use for a function ID / offset.
         */
        convertFunctionOffsetToLocation: (parameters: convertFunctionOffsetToLocationParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").convertFunctionOffsetToLocationResult>;
        /**
         * Get the offsets at which execution should pause when stepping around within
         * a frame for a function.
         */
        getStepOffsets: (parameters: getStepOffsetsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").getStepOffsetsResult>;
        /**
         * Get the most complete contents known for an HTML file.
         */
        getHTMLSource: (parameters: getHTMLSourceParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").getHTMLSourceResult>;
        /**
         * Get the IDs of all functions in a range within a source.
         */
        getFunctionsInRange: (parameters: getFunctionsInRangeParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").getFunctionsInRangeResult>;
        /**
         * Get any source map URL associated with a source.
         */
        getSourceMapURL: (parameters: getSourceMapURLParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").getSourceMapURLResult>;
        /**
         * Get any source map URL associated with a style sheet.
         */
        getSheetSourceMapURL: (parameters: getSheetSourceMapURLParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").getSheetSourceMapURLResult>;
        /**
         * This command might be sent from within a RecordReplayOnConsoleMessage() call
         * to get contents of the new message. Properties in the result have the same
         * meaning as for <code>Console.Message</code>.
         */
        getCurrentMessageContents: (parameters: getCurrentMessageContentsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").getCurrentMessageContentsResult>;
        /**
         * Count the number of stack frames on the stack. This is equivalent to using
         * the size of the stack returned by <code>Pause.getAllFrames</code>, but can
         * be implemented more efficiently.
         */
        countStackFrames: (parameters: countStackFramesParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").countStackFramesResult>;
        /**
         * If the topmost frame on the stack is a generator frame which can be popped
         * and pushed on the stack repeatedly, return a unique ID for the frame which
         * will be consistent across each of those pops and pushes.
         */
        currentGeneratorId: (parameters: currentGeneratorIdParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").currentGeneratorIdResult>;
        /**
         * Get the location of the top frame on the stack, if there is one.
         */
        topFrameLocation: (parameters: topFrameLocationParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Target").topFrameLocationResult>;
    };
    /**
     * The Internal domain is for use in software that is used to create recordings
     * and for internal/diagnostic use cases. While use of this domain is not
     * restricted, it won't be very helpful for other users.
     */
    Internal: {
        /**
         * Create a new recording.
         */
        createRecording: (parameters: createRecordingParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").createRecordingResult>;
        /**
         * Adds metadata that is associated with the entire recording in question,
         * as identified by the id field in the recordingData field. This includes things
         * like the URL being recorded as well as the token that is associated with the
         * user who started this recording.
         */
        setRecordingMetadata: (parameters: setRecordingMetadataParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").setRecordingMetadataResult>;
        /**
         * Add data to a recording. The next message sent after this must be a binary
         * message with the data described by this message. Uploaded recordings are not
         * explicitly finished; replay sessions created for a recording will include
         * all data which was successfully uploaded.
         */
        addRecordingData: (parameters: addRecordingDataParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").addRecordingDataResult>;
        /**
         * Add metadata about a recording.
         */
        addRecordingDescription: (parameters: addRecordingDescriptionParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").addRecordingDescriptionResult>;
        /**
         * Determine whether a resource is known to the cloud service.
         */
        hasResource: (parameters: hasResourceParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").hasResourceResult>;
        /**
         * Upload a resource's contents to the cloud service.
         */
        addResource: (parameters: addResourceParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").addResourceResult>;
        /**
         * Associate a resource with a recording.
         */
        addRecordingResource: (parameters: addRecordingResourceParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").addRecordingResourceResult>;
        /**
         * For testing network issues.
         */
        echo: (parameters: echoParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").echoResult>;
        /**
         * Mark a session which was created for an automated test.
         */
        labelTestSession: (parameters: labelTestSessionParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").labelTestSessionResult>;
        /**
         * Get the user's recordings
         */
        getRecordings: (parameters: getRecordingsParameters, sessionId?: string | undefined, pauseId?: string | undefined) => Promise<import("../protocol/Internal").getRecordingsResult>;
    };
}
