import { getDescriptionParameters, getDescriptionResult, getMetadataParameters, getMetadataResult, setMetadataParameters, setMetadataResult, metadataStartListeningParameters, metadataStartListeningResult, metadataStopListeningParameters, metadataStopListeningResult, createSessionParameters, createSessionResult, releaseSessionParameters, releaseSessionResult, processRecordingParameters, processRecordingResult } from "../protocol/Recording";
import { ensureProcessedParameters, ensureProcessedResult, findMouseEventsParameters, findMouseEventsResult, getEndpointParameters, getEndpointResult, createPauseParameters, createPauseResult, releasePauseParameters, releasePauseResult, SessionId } from "../protocol/Session";
import { findPaintsParameters, findPaintsResult, getPaintContentsParameters, getPaintContentsResult, getDevicePixelRatioParameters, getDevicePixelRatioResult } from "../protocol/Graphics";
import { findScriptsParameters, findScriptsResult, getScriptSourceParameters, getScriptSourceResult, getPossibleBreakpointsParameters, getPossibleBreakpointsResult, getMappedLocationParameters, getMappedLocationResult, setBreakpointParameters, setBreakpointResult, removeBreakpointParameters, removeBreakpointResult, findResumeTargetParameters, findResumeTargetResult, findRewindTargetParameters, findRewindTargetResult, findReverseStepOverTargetParameters, findReverseStepOverTargetResult, findStepOverTargetParameters, findStepOverTargetResult, findStepInTargetParameters, findStepInTargetResult, findStepOutTargetParameters, findStepOutTargetResult, blackboxScriptParameters, blackboxScriptResult, unblackboxScriptParameters, unblackboxScriptResult } from "../protocol/Debugger";
import { findMessagesParameters, findMessagesResult } from "../protocol/Console";
import { evaluateInFrameParameters, evaluateInFrameResult, evaluateInGlobalParameters, evaluateInGlobalResult, getObjectPropertyParameters, getObjectPropertyResult, callFunctionParameters, callFunctionResult, callObjectPropertyParameters, callObjectPropertyResult, getObjectPreviewParameters, getObjectPreviewResult, getScopeParameters, getScopeResult, getTopFrameParameters, getTopFrameResult, getAllFramesParameters, getAllFramesResult, getFrameArgumentsParameters, getFrameArgumentsResult, getFrameStepsParameters, getFrameStepsResult, getExceptionValueParameters, getExceptionValueResult, PauseId } from "../protocol/Pause";
import { getDocumentParameters, getDocumentResult, getParentNodesParameters, getParentNodesResult, querySelectorParameters, querySelectorResult, getEventListenersParameters, getEventListenersResult, getBoxModelParameters, getBoxModelResult, getBoundingClientRectParameters, getBoundingClientRectResult, getAllBoundingClientRectsParameters, getAllBoundingClientRectsResult, performSearchParameters, performSearchResult } from "../protocol/DOM";
import { getComputedStyleParameters, getComputedStyleResult, getAppliedRulesParameters, getAppliedRulesResult } from "../protocol/CSS";
import { createAnalysisParameters, createAnalysisResult, addLocationParameters, addLocationResult, addFunctionEntryPointsParameters, addFunctionEntryPointsResult, addRandomPointsParameters, addRandomPointsResult, addEventHandlerEntryPointsParameters, addEventHandlerEntryPointsResult, addExceptionPointsParameters, addExceptionPointsResult, runAnalysisParameters, runAnalysisResult, releaseAnalysisParameters, releaseAnalysisResult, findAnalysisPointsParameters, findAnalysisPointsResult } from "../protocol/Analysis";
import { convertLocationToFunctionOffsetParameters, convertLocationToFunctionOffsetResult, convertFunctionOffsetToLocationParameters, convertFunctionOffsetToLocationResult, getStepOffsetsParameters, getStepOffsetsResult, getHTMLSourceParameters, getHTMLSourceResult, getFunctionsInRangeParameters, getFunctionsInRangeResult, getScriptSourceMapURLParameters, getScriptSourceMapURLResult, getSheetSourceMapURLParameters, getSheetSourceMapURLResult, getCurrentMessageContentsParameters, getCurrentMessageContentsResult, countStackFramesParameters, countStackFramesResult, currentGeneratorIdParameters, currentGeneratorIdResult } from "../protocol/Host";
import { createRecordingParameters, createRecordingResult, addRecordingDataParameters, addRecordingDataResult, addRecordingDescriptionParameters, addRecordingDescriptionResult, hasResourceParameters, hasResourceResult, addResourceParameters, addResourceResult, addRecordingResourceParameters, addRecordingResourceResult, getAssertionFiltersParameters, getAssertionFiltersResult, echoParameters, echoResult, labelTestSessionParameters, labelTestSessionResult, getRecordingsParameters, getRecordingsResult } from "../protocol/Internal";
export interface ProtocolMessageHandlers {
    /**
     * Get a description of a recording.
     */
    "Recording.getDescription": (parameters: getDescriptionParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getDescriptionResult | null> | getDescriptionResult | null;
    /**
     * Get an entry in a recording's metadata key/value store.
     */
    "Recording.getMetadata": (parameters: getMetadataParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getMetadataResult | null> | getMetadataResult | null;
    /**
     * Set an entry in a recording's metadata.
     */
    "Recording.setMetadata": (parameters: setMetadataParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<setMetadataResult | null> | setMetadataResult | null;
    /**
     * Listen for changes to an entry in a recording's metadata. When listening,
     * <code>metadataChange</code> events will be emitted whenever the entry's
     * value changes.
     */
    "Recording.metadataStartListening": (parameters: metadataStartListeningParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<metadataStartListeningResult | null> | metadataStartListeningResult | null;
    /**
     * Stop listening for changes to an entry in a recording's metadata.
     */
    "Recording.metadataStopListening": (parameters: metadataStopListeningParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<metadataStopListeningResult | null> | metadataStopListeningResult | null;
    /**
     * Create a session for inspecting a recording. This command does not return
     * until the recording's contents have been fully received. If the contents
     * are incomplete, <code>uploadedData</code> events will be periodically
     * emitted before the command returns. After creating, a <code>sessionError</code>
     * events may be emitted later if the session dies unexpectedly.
     */
    "Recording.createSession": (parameters: createSessionParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<createSessionResult | null> | createSessionResult | null;
    /**
     * Release a session and allow its resources to be reclaimed.
     */
    "Recording.releaseSession": (parameters: releaseSessionParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<releaseSessionResult | null> | releaseSessionResult | null;
    /**
     * Begin processing a recording, even if no sessions have been created for it.
     * After calling this, sessions created for the recording (on this connection,
     * or another) may start in a partially or fully processed state and start
     * being used immediately.
     */
    "Recording.processRecording": (parameters: processRecordingParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<processRecordingResult | null> | processRecordingResult | null;
    /**
     * Does not return until the recording is fully processed. Before returning,
     * <code>missingRegions</code> and <code>unprocessedRegions</code> events will
     * be periodically emitted.
     */
    "Session.ensureProcessed": (parameters: ensureProcessedParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<ensureProcessedResult | null> | ensureProcessedResult | null;
    /**
     * Find all points in the recording at which a mouse move or click occurred.
     * Does not return until the recording is fully processed. Before returning,
     * <code>mouseEvents</code> events will be periodically emitted. The union
     * of all these events describes all mouse events in the recording.
     */
    "Session.findMouseEvents": (parameters: findMouseEventsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findMouseEventsResult | null> | findMouseEventsResult | null;
    /**
     * Get the last execution point in the recording.
     */
    "Session.getEndpoint": (parameters: getEndpointParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getEndpointResult | null> | getEndpointResult | null;
    /**
     * Create a pause describing the state at an execution point.
     */
    "Session.createPause": (parameters: createPauseParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<createPauseResult | null> | createPauseResult | null;
    /**
     * Release a pause and allow its resources to be reclaimed.
     */
    "Session.releasePause": (parameters: releasePauseParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<releasePauseResult | null> | releasePauseResult | null;
    /**
     * Find all points in the recording at which paints occurred. Does not return
     * until the recording is fully processed. Before returning,
     * <code>paintPoints</code> events will be periodically emitted. The union
     * of all these events describes all paint points in the recording.
     */
    "Graphics.findPaints": (parameters: findPaintsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findPaintsResult | null> | findPaintsResult | null;
    /**
     * Get the graphics at a point where a paint occurred.
     */
    "Graphics.getPaintContents": (parameters: getPaintContentsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getPaintContentsResult | null> | getPaintContentsResult | null;
    /**
     * Get the value of <code>window.devicePixelRatio</code>. This is the ratio of
     * pixels in screen shots to pixels used by DOM/CSS data such as
     * <code>DOM.getBoundingClientRect</code>.
     */
    "Graphics.getDevicePixelRatio": (parameters: getDevicePixelRatioParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getDevicePixelRatioResult | null> | getDevicePixelRatioResult | null;
    /**
     * Find all scripts in the recording. Does not return until the recording is
     * fully processed. Before returning, <code>scriptParsed</code> events will be
     * emitted for every script in the recording.
     */
    "Debugger.findScripts": (parameters: findScriptsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findScriptsResult | null> | findScriptsResult | null;
    /**
     * Get the source contents of a script.
     */
    "Debugger.getScriptSource": (parameters: getScriptSourceParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getScriptSourceResult | null> | getScriptSourceResult | null;
    /**
     * Get a compact representation of the locations where breakpoints can be set
     * in a region of a script.
     */
    "Debugger.getPossibleBreakpoints": (parameters: getPossibleBreakpointsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getPossibleBreakpointsResult | null> | getPossibleBreakpointsResult | null;
    /**
     * Get the mapped location for a script location.
     */
    "Debugger.getMappedLocation": (parameters: getMappedLocationParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getMappedLocationResult | null> | getMappedLocationResult | null;
    /**
     * Set a breakpoint at a location.
     */
    "Debugger.setBreakpoint": (parameters: setBreakpointParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<setBreakpointResult | null> | setBreakpointResult | null;
    /**
     * Remove a breakpoint.
     */
    "Debugger.removeBreakpoint": (parameters: removeBreakpointParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<removeBreakpointResult | null> | removeBreakpointResult | null;
    /**
     * Find where to pause when running forward from a point.
     */
    "Debugger.findResumeTarget": (parameters: findResumeTargetParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findResumeTargetResult | null> | findResumeTargetResult | null;
    /**
     * Find where to pause when rewinding from a point.
     */
    "Debugger.findRewindTarget": (parameters: findRewindTargetParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findRewindTargetResult | null> | findRewindTargetResult | null;
    /**
     * Find where to pause when reverse-stepping from a point.
     */
    "Debugger.findReverseStepOverTarget": (parameters: findReverseStepOverTargetParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findReverseStepOverTargetResult | null> | findReverseStepOverTargetResult | null;
    /**
     * Find where to pause when stepping from a point.
     */
    "Debugger.findStepOverTarget": (parameters: findStepOverTargetParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findStepOverTargetResult | null> | findStepOverTargetResult | null;
    /**
     * Find where to pause when stepping from a point and stopping at the entry of
     * any encountered call.
     */
    "Debugger.findStepInTarget": (parameters: findStepInTargetParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findStepInTargetResult | null> | findStepInTargetResult | null;
    /**
     * Find where to pause when stepping out from a frame to the caller.
     */
    "Debugger.findStepOutTarget": (parameters: findStepOutTargetParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findStepOutTargetResult | null> | findStepOutTargetResult | null;
    /**
     * Blackbox a script or a region in it. Resume commands like
     * <code>findResumeTarget</code> will not return execution points in
     * blackboxed regions of a script.
     */
    "Debugger.blackboxScript": (parameters: blackboxScriptParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<blackboxScriptResult | null> | blackboxScriptResult | null;
    /**
     * Unblackbox a script or a region in it.
     */
    "Debugger.unblackboxScript": (parameters: unblackboxScriptParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<unblackboxScriptResult | null> | unblackboxScriptResult | null;
    /**
     * Find all messages in the recording. Does not return until the recording is
     * fully processed. Before returning, <code>newMessage</code> events will be
     * emitted for every console message in the recording.
     */
    "Console.findMessages": (parameters: findMessagesParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findMessagesResult | null> | findMessagesResult | null;
    /**
     * Evaluate an expression in the context of a call frame. This command is
     * effectful.
     */
    "Pause.evaluateInFrame": (parameters: evaluateInFrameParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<evaluateInFrameResult | null> | evaluateInFrameResult | null;
    /**
     * Evaluate an expression in a global context. This command is effectful.
     */
    "Pause.evaluateInGlobal": (parameters: evaluateInGlobalParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<evaluateInGlobalResult | null> | evaluateInGlobalResult | null;
    /**
     * Read a property from an object. This command is effectful.
     */
    "Pause.getObjectProperty": (parameters: getObjectPropertyParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getObjectPropertyResult | null> | getObjectPropertyResult | null;
    /**
     * Call a function object. This command is effectful.
     */
    "Pause.callFunction": (parameters: callFunctionParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<callFunctionResult | null> | callFunctionResult | null;
    /**
     * Read a property from an object, then call the result. This command is effectful.
     */
    "Pause.callObjectProperty": (parameters: callObjectPropertyParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<callObjectPropertyResult | null> | callObjectPropertyResult | null;
    /**
     * Load a preview for an object.
     */
    "Pause.getObjectPreview": (parameters: getObjectPreviewParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getObjectPreviewResult | null> | getObjectPreviewResult | null;
    /**
     * Load a scope's contents.
     */
    "Pause.getScope": (parameters: getScopeParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getScopeResult | null> | getScopeResult | null;
    /**
     * Get the topmost frame on the stack.
     */
    "Pause.getTopFrame": (parameters: getTopFrameParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getTopFrameResult | null> | getTopFrameResult | null;
    /**
     * Get all frames on the stack.
     */
    "Pause.getAllFrames": (parameters: getAllFramesParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getAllFramesResult | null> | getAllFramesResult | null;
    /**
     * Get the values of a frame's arguments.
     */
    "Pause.getFrameArguments": (parameters: getFrameArgumentsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getFrameArgumentsResult | null> | getFrameArgumentsResult | null;
    /**
     * Get the points of all steps that are executed by a frame.
     */
    "Pause.getFrameSteps": (parameters: getFrameStepsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getFrameStepsResult | null> | getFrameStepsResult | null;
    /**
     * Get any exception that is being thrown at this point.
     */
    "Pause.getExceptionValue": (parameters: getExceptionValueParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getExceptionValueResult | null> | getExceptionValueResult | null;
    /**
     * Get the page's root document.
     */
    "DOM.getDocument": (parameters: getDocumentParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getDocumentResult | null> | getDocumentResult | null;
    /**
     * Load previews for an object and its transitive parents up to the
     * root document.
     */
    "DOM.getParentNodes": (parameters: getParentNodesParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getParentNodesResult | null> | getParentNodesResult | null;
    /**
     * Call querySelector() on a node in the page.
     */
    "DOM.querySelector": (parameters: querySelectorParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<querySelectorResult | null> | querySelectorResult | null;
    /**
     * Get the event listeners attached to a node in the page.
     */
    "DOM.getEventListeners": (parameters: getEventListenersParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getEventListenersResult | null> | getEventListenersResult | null;
    /**
     * Get boxes for a node.
     */
    "DOM.getBoxModel": (parameters: getBoxModelParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getBoxModelResult | null> | getBoxModelResult | null;
    /**
     * Get the bounding client rect for a node.
     */
    "DOM.getBoundingClientRect": (parameters: getBoundingClientRectParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getBoundingClientRectResult | null> | getBoundingClientRectResult | null;
    /**
     * Get the bounding client rect for all elements on the page.
     */
    "DOM.getAllBoundingClientRects": (parameters: getAllBoundingClientRectsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getAllBoundingClientRectsResult | null> | getAllBoundingClientRectsResult | null;
    /**
     * Search the DOM for nodes containing a string.
     */
    "DOM.performSearch": (parameters: performSearchParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<performSearchResult | null> | performSearchResult | null;
    /**
     * Get the styles computed for a node.
     */
    "CSS.getComputedStyle": (parameters: getComputedStyleParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getComputedStyleResult | null> | getComputedStyleResult | null;
    /**
     * Get the style rules being applied to a node.
     */
    "CSS.getAppliedRules": (parameters: getAppliedRulesParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getAppliedRulesResult | null> | getAppliedRulesResult | null;
    /**
     * Start specifying a new analysis.
     */
    "Analysis.createAnalysis": (parameters: createAnalysisParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<createAnalysisResult | null> | createAnalysisResult | null;
    /**
     * Apply the analysis to every point where a script location executes.
     */
    "Analysis.addLocation": (parameters: addLocationParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addLocationResult | null> | addLocationResult | null;
    /**
     * Apply the analysis to every function entry point in a region of a script.
     */
    "Analysis.addFunctionEntryPoints": (parameters: addFunctionEntryPointsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addFunctionEntryPointsResult | null> | addFunctionEntryPointsResult | null;
    /**
     * Apply the analysis to a random selection of points.
     */
    "Analysis.addRandomPoints": (parameters: addRandomPointsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addRandomPointsResult | null> | addRandomPointsResult | null;
    /**
     * Apply the analysis to the entry point of every handler for an event.
     */
    "Analysis.addEventHandlerEntryPoints": (parameters: addEventHandlerEntryPointsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addEventHandlerEntryPointsResult | null> | addEventHandlerEntryPointsResult | null;
    /**
     * Apply the analysis to every point where an exception is thrown.
     */
    "Analysis.addExceptionPoints": (parameters: addExceptionPointsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addExceptionPointsResult | null> | addExceptionPointsResult | null;
    /**
     * Run the analysis. After this is called, <code>analysisResult</code> and/or
     * <code>analysisError</code> events will be emitted as results are gathered.
     * Does not return until the analysis has finished and all events have been
     * emitted.
     */
    "Analysis.runAnalysis": (parameters: runAnalysisParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<runAnalysisResult | null> | runAnalysisResult | null;
    /**
     * Release an analysis and its server side resources. If the analysis is
     * running, it will be canceled, preventing further <code>analysisResult</code>
     * and <code>analysisError</code> events from being emitted.
     */
    "Analysis.releaseAnalysis": (parameters: releaseAnalysisParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<releaseAnalysisResult | null> | releaseAnalysisResult | null;
    /**
     * Find the set of execution points at which an analysis will run. After this
     * is called, <code>analysisPoints</code> events will be emitted as the points
     * are found. Does not return until events for all points have been emitted.
     * Can only be used after the analysis has started running.
     */
    "Analysis.findAnalysisPoints": (parameters: findAnalysisPointsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<findAnalysisPointsResult | null> | findAnalysisPointsResult | null;
    /**
     * Get the function ID / offset to use for a script location, if there is one.
     */
    "Host.convertLocationToFunctionOffset": (parameters: convertLocationToFunctionOffsetParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<convertLocationToFunctionOffsetResult | null> | convertLocationToFunctionOffsetResult | null;
    /**
     * Get the location to use for a function ID / offset.
     */
    "Host.convertFunctionOffsetToLocation": (parameters: convertFunctionOffsetToLocationParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<convertFunctionOffsetToLocationResult | null> | convertFunctionOffsetToLocationResult | null;
    /**
     * Get the offsets at which execution should pause when stepping around within
     * a frame for a function.
     */
    "Host.getStepOffsets": (parameters: getStepOffsetsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getStepOffsetsResult | null> | getStepOffsetsResult | null;
    /**
     * Get the most complete contents known for an HTML file.
     */
    "Host.getHTMLSource": (parameters: getHTMLSourceParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getHTMLSourceResult | null> | getHTMLSourceResult | null;
    /**
     * Get the IDs of all functions in a range within a script.
     */
    "Host.getFunctionsInRange": (parameters: getFunctionsInRangeParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getFunctionsInRangeResult | null> | getFunctionsInRangeResult | null;
    /**
     * Get any source map URL associated with a script.
     */
    "Host.getScriptSourceMapURL": (parameters: getScriptSourceMapURLParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getScriptSourceMapURLResult | null> | getScriptSourceMapURLResult | null;
    /**
     * Get any source map URL associated with a style sheet.
     */
    "Host.getSheetSourceMapURL": (parameters: getSheetSourceMapURLParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getSheetSourceMapURLResult | null> | getSheetSourceMapURLResult | null;
    /**
     * This command might be sent from within a RecordReplayOnConsoleMessage() call
     * to get  contents of the new message. Properties in the result have the same
     * meaning as for <code>Console.Message</code>.
     */
    "Host.getCurrentMessageContents": (parameters: getCurrentMessageContentsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getCurrentMessageContentsResult | null> | getCurrentMessageContentsResult | null;
    /**
     * Count the number of stack frames on the stack. This is equivalent to using
     * the size of the stack returned by <code>Pause.getAllFrames</code>, but can
     * be implemented more efficiently.
     */
    "Host.countStackFrames": (parameters: countStackFramesParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<countStackFramesResult | null> | countStackFramesResult | null;
    /**
     * If the topmost frame on the stack is a generator frame which can be popped
     * and pushed on the stack repeatedly, return a unique ID for the frame which
     * will be consistent across each of those pops and pushes.
     */
    "Host.currentGeneratorId": (parameters: currentGeneratorIdParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<currentGeneratorIdResult | null> | currentGeneratorIdResult | null;
    /**
     * Create a new recording.
     */
    "Internal.createRecording": (parameters: createRecordingParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<createRecordingResult | null> | createRecordingResult | null;
    /**
     * Add data to a recording. The next message sent after this must be a binary
     * message with the data described by this message. Uploaded recordings are not
     * explicitly finished; replay sessions created for a recording will include
     * all data which was successfully uploaded.
     */
    "Internal.addRecordingData": (parameters: addRecordingDataParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addRecordingDataResult | null> | addRecordingDataResult | null;
    /**
     * Add metadata about a recording.
     */
    "Internal.addRecordingDescription": (parameters: addRecordingDescriptionParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addRecordingDescriptionResult | null> | addRecordingDescriptionResult | null;
    /**
     * Determine whether a resource is known to the cloud service.
     */
    "Internal.hasResource": (parameters: hasResourceParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<hasResourceResult | null> | hasResourceResult | null;
    /**
     * Upload a resource's contents to the cloud service.
     */
    "Internal.addResource": (parameters: addResourceParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addResourceResult | null> | addResourceResult | null;
    /**
     * Associate a resource with a recording.
     */
    "Internal.addRecordingResource": (parameters: addRecordingResourceParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<addRecordingResourceResult | null> | addRecordingResourceResult | null;
    /**
     * Get filters for where to add more detailed assertions when recording that
     * behavior is consistent with the replay. These are used when analyzing crashes.
     */
    "Internal.getAssertionFilters": (parameters: getAssertionFiltersParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getAssertionFiltersResult | null> | getAssertionFiltersResult | null;
    /**
     * For testing network issues.
     */
    "Internal.echo": (parameters: echoParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<echoResult | null> | echoResult | null;
    /**
     * Mark a session which was created for an automated test.
     */
    "Internal.labelTestSession": (parameters: labelTestSessionParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<labelTestSessionResult | null> | labelTestSessionResult | null;
    /**
     * Get the user's recordings
     */
    "Internal.getRecordings": (parameters: getRecordingsParameters, sessionId?: SessionId, pauseId?: PauseId) => Promise<getRecordingsResult | null> | getRecordingsResult | null;
}
