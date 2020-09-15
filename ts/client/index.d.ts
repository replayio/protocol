import {
  metadataChange,
  uploadedData,
  sessionError,
  getDescriptionParameters,
  getDescriptionResult,
  getMetadataParameters,
  getMetadataResult,
  setMetadataParameters,
  setMetadataResult,
  metadataStartListeningParameters,
  metadataStartListeningResult,
  metadataStopListeningParameters,
  metadataStopListeningResult,
  createSessionParameters,
  createSessionResult,
  releaseSessionParameters,
  releaseSessionResult,
  processRecordingParameters,
  processRecordingResult
} from "../protocol/Recording";
import {
  missingRegions,
  unprocessedRegions,
  mouseEvents,
  ensureProcessedParameters,
  ensureProcessedResult,
  findMouseEventsParameters,
  findMouseEventsResult,
  getEndpointParameters,
  getEndpointResult,
  createPauseParameters,
  createPauseResult,
  releasePauseParameters,
  releasePauseResult,
  SessionId
} from "../protocol/Session";
import {
  paintPoints,
  findPaintsParameters,
  findPaintsResult,
  getPaintContentsParameters,
  getPaintContentsResult,
  getDevicePixelRatioParameters,
  getDevicePixelRatioResult
} from "../protocol/Graphics";
import {
  scriptParsed,
  findScriptsParameters,
  findScriptsResult,
  getScriptSourceParameters,
  getScriptSourceResult,
  getPossibleBreakpointsParameters,
  getPossibleBreakpointsResult,
  getMappedLocationParameters,
  getMappedLocationResult,
  setBreakpointParameters,
  setBreakpointResult,
  removeBreakpointParameters,
  removeBreakpointResult,
  findResumeTargetParameters,
  findResumeTargetResult,
  findRewindTargetParameters,
  findRewindTargetResult,
  findReverseStepOverTargetParameters,
  findReverseStepOverTargetResult,
  findStepOverTargetParameters,
  findStepOverTargetResult,
  findStepInTargetParameters,
  findStepInTargetResult,
  findStepOutTargetParameters,
  findStepOutTargetResult,
  blackboxScriptParameters,
  blackboxScriptResult,
  unblackboxScriptParameters,
  unblackboxScriptResult
} from "../protocol/Debugger";
import {
  newMessage,
  findMessagesParameters,
  findMessagesResult
} from "../protocol/Console";
import {
  evaluateInFrameParameters,
  evaluateInFrameResult,
  evaluateInGlobalParameters,
  evaluateInGlobalResult,
  getObjectPropertyParameters,
  getObjectPropertyResult,
  callFunctionParameters,
  callFunctionResult,
  callObjectPropertyParameters,
  callObjectPropertyResult,
  getObjectPreviewParameters,
  getObjectPreviewResult,
  getScopeParameters,
  getScopeResult,
  getTopFrameParameters,
  getTopFrameResult,
  getAllFramesParameters,
  getAllFramesResult,
  getFrameArgumentsParameters,
  getFrameArgumentsResult,
  getFrameStepsParameters,
  getFrameStepsResult,
  getExceptionValueParameters,
  getExceptionValueResult
} from "../protocol/Pause";
import {
  getDocumentParameters,
  getDocumentResult,
  getParentNodesParameters,
  getParentNodesResult,
  querySelectorParameters,
  querySelectorResult,
  getEventListenersParameters,
  getEventListenersResult,
  getBoxModelParameters,
  getBoxModelResult,
  getBoundingClientRectParameters,
  getBoundingClientRectResult,
  getAllBoundingClientRectsParameters,
  getAllBoundingClientRectsResult,
  performSearchParameters,
  performSearchResult
} from "../protocol/DOM";
import {
  getComputedStyleParameters,
  getComputedStyleResult,
  getAppliedRulesParameters,
  getAppliedRulesResult
} from "../protocol/CSS";
import {
  analysisResult,
  analysisError,
  analysisPoints,
  createAnalysisParameters,
  createAnalysisResult,
  addLocationParameters,
  addLocationResult,
  addFunctionEntryPointsParameters,
  addFunctionEntryPointsResult,
  addRandomPointsParameters,
  addRandomPointsResult,
  addEventHandlerEntryPointsParameters,
  addEventHandlerEntryPointsResult,
  addExceptionPointsParameters,
  addExceptionPointsResult,
  runAnalysisParameters,
  runAnalysisResult,
  releaseAnalysisParameters,
  releaseAnalysisResult,
  findAnalysisPointsParameters,
  findAnalysisPointsResult
} from "../protocol/Analysis";
import {
  createRecordingParameters,
  createRecordingResult,
  addRecordingDataParameters,
  addRecordingDataResult,
  addRecordingDescriptionParameters,
  addRecordingDescriptionResult,
  hasResourceParameters,
  hasResourceResult,
  addResourceParameters,
  addResourceResult,
  addRecordingResourceParameters,
  addRecordingResourceResult,
  getAssertionFiltersParameters,
  getAssertionFiltersResult,
  echoParameters,
  echoResult,
  convertLocationToFunctionOffsetParameters,
  convertLocationToFunctionOffsetResult,
  convertFunctionOffsetToLocationParameters,
  convertFunctionOffsetToLocationResult,
  labelTestSessionParameters,
  labelTestSessionResult,
  getRecordingsParameters,
  getRecordingsResult
} from "../protocol/Internal";

export declare class ProtocolClient {

  /**
   * Describes a change to an entry in a recording's metadata.
   */
  addEventListener(event: "Recording.metadataChange", listener: (parameters: metadataChange) => void): void;

  /**
   * Describes how much of a recording's data has been uploaded to the cloud service.
   */
  addEventListener(event: "Recording.uploadedData", listener: (parameters: uploadedData) => void): void;

  /**
   * Emitted when a session has died due to a server side problem.
   */
  addEventListener(event: "Recording.sessionError", listener: (parameters: sessionError) => void): void;

  /**
   * Event describing regions of the recording that have not been uploaded.
   */
  addEventListener(event: "Session.missingRegions", listener: (parameters: missingRegions) => void): void;

  /**
   * Event describing regions of the recording that have not been processed.
   */
  addEventListener(event: "Session.unprocessedRegions", listener: (parameters: unprocessedRegions) => void): void;

  /**
   * Describes some mouse events that occur in the recording.
   */
  addEventListener(event: "Session.mouseEvents", listener: (parameters: mouseEvents) => void): void;

  /**
   * Describes some points in the recording at which paints occurred. No paint
   * will occur for the recording's beginning execution point.
   */
  addEventListener(event: "Graphics.paintPoints", listener: (parameters: paintPoints) => void): void;

  /**
   * Describes a script that was successfully parsed.
   */
  addEventListener(event: "Debugger.scriptParsed", listener: (parameters: scriptParsed) => void): void;

  /**
   * Describes a console message in the recording.
   */
  addEventListener(event: "Console.newMessage", listener: (parameters: newMessage) => void): void;

  /**
   * Describes some results of an analysis.
   */
  addEventListener(event: "Analysis.analysisResult", listener: (parameters: analysisResult) => void): void;

  /**
   * Describes an error that occurred when running an analysis mapper or reducer
   * function. This will not be emitted for every error, but if there was any
   * error then at least one event will be emitted.
   */
  addEventListener(event: "Analysis.analysisError", listener: (parameters: analysisError) => void): void;

  /**
   * Describes some points at which an analysis will run.
   */
  addEventListener(event: "Analysis.analysisPoints", listener: (parameters: analysisPoints) => void): void;


  /**
   * Get a description of a recording.
   */
  sendCommand(command: "Recording.getDescription", parameters: getDescriptionParameters, sessionId: SessionId): getDescriptionResult;

  /**
   * Get an entry in a recording's metadata key/value store.
   */
  sendCommand(command: "Recording.getMetadata", parameters: getMetadataParameters, sessionId: SessionId): getMetadataResult;

  /**
   * Set an entry in a recording's metadata.
   */
  sendCommand(command: "Recording.setMetadata", parameters: setMetadataParameters, sessionId: SessionId): setMetadataResult;

  /**
   * Listen for changes to an entry in a recording's metadata. When listening,
   * <code>metadataChange</code> events will be emitted whenever the entry's
   * value changes.
   */
  sendCommand(command: "Recording.metadataStartListening", parameters: metadataStartListeningParameters, sessionId: SessionId): metadataStartListeningResult;

  /**
   * Stop listening for changes to an entry in a recording's metadata.
   */
  sendCommand(command: "Recording.metadataStopListening", parameters: metadataStopListeningParameters, sessionId: SessionId): metadataStopListeningResult;

  /**
   * Create a session for inspecting a recording. This command does not return
   * until the recording's contents have been fully received. If the contents
   * are incomplete, <code>uploadedData</code> events will be periodically
   * emitted before the command returns. After creating, a <code>sessionError</code>
   * events may be emitted later if the session dies unexpectedly.
   */
  sendCommand(command: "Recording.createSession", parameters: createSessionParameters, sessionId: SessionId): createSessionResult;

  /**
   * Release a session and allow its resources to be reclaimed.
   */
  sendCommand(command: "Recording.releaseSession", parameters: releaseSessionParameters, sessionId: SessionId): releaseSessionResult;

  /**
   * Begin processing a recording, even if no sessions have been created for it.
   * After calling this, sessions created for the recording (on this connection,
   * or another) may start in a partially or fully processed state and start
   * being used immediately.
   */
  sendCommand(command: "Recording.processRecording", parameters: processRecordingParameters, sessionId: SessionId): processRecordingResult;

  /**
   * Does not return until the recording is fully processed. Before returning,
   * <code>missingRegions</code> and <code>unprocessedRegions</code> events will
   * be periodically emitted.
   */
  sendCommand(command: "Session.ensureProcessed", parameters: ensureProcessedParameters, sessionId: SessionId): ensureProcessedResult;

  /**
   * Find all points in the recording at which a mouse move or click occurred.
   * Does not return until the recording is fully processed. Before returning,
   * <code>mouseEvents</code> events will be periodically emitted. The union
   * of all these events describes all mouse events in the recording.
   */
  sendCommand(command: "Session.findMouseEvents", parameters: findMouseEventsParameters, sessionId: SessionId): findMouseEventsResult;

  /**
   * Get the last execution point in the recording.
   */
  sendCommand(command: "Session.getEndpoint", parameters: getEndpointParameters, sessionId: SessionId): getEndpointResult;

  /**
   * Create a pause describing the state at an execution point.
   */
  sendCommand(command: "Session.createPause", parameters: createPauseParameters, sessionId: SessionId): createPauseResult;

  /**
   * Release a pause and allow its resources to be reclaimed.
   */
  sendCommand(command: "Session.releasePause", parameters: releasePauseParameters, sessionId: SessionId): releasePauseResult;

  /**
   * Find all points in the recording at which paints occurred. Does not return
   * until the recording is fully processed. Before returning,
   * <code>paintPoints</code> events will be periodically emitted. The union
   * of all these events describes all paint points in the recording.
   */
  sendCommand(command: "Graphics.findPaints", parameters: findPaintsParameters, sessionId: SessionId): findPaintsResult;

  /**
   * Get the graphics at a point where a paint occurred.
   */
  sendCommand(command: "Graphics.getPaintContents", parameters: getPaintContentsParameters, sessionId: SessionId): getPaintContentsResult;

  /**
   * Get the value of <code>window.devicePixelRatio</code>. This is the ratio of
   * pixels in screen shots to pixels used by DOM/CSS data such as
   * <code>DOM.getBoundingClientRect</code>.
   */
  sendCommand(command: "Graphics.getDevicePixelRatio", parameters: getDevicePixelRatioParameters, sessionId: SessionId): getDevicePixelRatioResult;

  /**
   * Find all scripts in the recording. Does not return until the recording is
   * fully processed. Before returning, <code>scriptParsed</code> events will be
   * emitted for every script in the recording.
   */
  sendCommand(command: "Debugger.findScripts", parameters: findScriptsParameters, sessionId: SessionId): findScriptsResult;

  /**
   * Get the source contents of a script.
   */
  sendCommand(command: "Debugger.getScriptSource", parameters: getScriptSourceParameters, sessionId: SessionId): getScriptSourceResult;

  /**
   * Get a compact representation of the locations where breakpoints can be set
   * in a region of a script.
   */
  sendCommand(command: "Debugger.getPossibleBreakpoints", parameters: getPossibleBreakpointsParameters, sessionId: SessionId): getPossibleBreakpointsResult;

  /**
   * Get the mapped location for a script location.
   */
  sendCommand(command: "Debugger.getMappedLocation", parameters: getMappedLocationParameters, sessionId: SessionId): getMappedLocationResult;

  /**
   * Set a breakpoint at a location.
   */
  sendCommand(command: "Debugger.setBreakpoint", parameters: setBreakpointParameters, sessionId: SessionId): setBreakpointResult;

  /**
   * Remove a breakpoint.
   */
  sendCommand(command: "Debugger.removeBreakpoint", parameters: removeBreakpointParameters, sessionId: SessionId): removeBreakpointResult;

  /**
   * Find where to pause when running forward from a point.
   */
  sendCommand(command: "Debugger.findResumeTarget", parameters: findResumeTargetParameters, sessionId: SessionId): findResumeTargetResult;

  /**
   * Find where to pause when rewinding from a point.
   */
  sendCommand(command: "Debugger.findRewindTarget", parameters: findRewindTargetParameters, sessionId: SessionId): findRewindTargetResult;

  /**
   * Find where to pause when reverse-stepping from a point.
   */
  sendCommand(command: "Debugger.findReverseStepOverTarget", parameters: findReverseStepOverTargetParameters, sessionId: SessionId): findReverseStepOverTargetResult;

  /**
   * Find where to pause when stepping from a point.
   */
  sendCommand(command: "Debugger.findStepOverTarget", parameters: findStepOverTargetParameters, sessionId: SessionId): findStepOverTargetResult;

  /**
   * Find where to pause when stepping from a point and stopping at the entry of
   * any encountered call.
   */
  sendCommand(command: "Debugger.findStepInTarget", parameters: findStepInTargetParameters, sessionId: SessionId): findStepInTargetResult;

  /**
   * Find where to pause when stepping out from a frame to the caller.
   */
  sendCommand(command: "Debugger.findStepOutTarget", parameters: findStepOutTargetParameters, sessionId: SessionId): findStepOutTargetResult;

  /**
   * Blackbox a script or a region in it. Resume commands like
   * <code>findResumeTarget</code> will not return execution points in
   * blackboxed regions of a script.
   */
  sendCommand(command: "Debugger.blackboxScript", parameters: blackboxScriptParameters, sessionId: SessionId): blackboxScriptResult;

  /**
   * Unblackbox a script or a region in it.
   */
  sendCommand(command: "Debugger.unblackboxScript", parameters: unblackboxScriptParameters, sessionId: SessionId): unblackboxScriptResult;

  /**
   * Find all messages in the recording. Does not return until the recording is
   * fully processed. Before returning, <code>newMessage</code> events will be
   * emitted for every console message in the recording.
   */
  sendCommand(command: "Console.findMessages", parameters: findMessagesParameters, sessionId: SessionId): findMessagesResult;

  /**
   * Evaluate an expression in the context of a call frame. This command is
   * effectful.
   */
  sendCommand(command: "Pause.evaluateInFrame", parameters: evaluateInFrameParameters, sessionId: SessionId): evaluateInFrameResult;

  /**
   * Evaluate an expression in a global context. This command is effectful.
   */
  sendCommand(command: "Pause.evaluateInGlobal", parameters: evaluateInGlobalParameters, sessionId: SessionId): evaluateInGlobalResult;

  /**
   * Read a property from an object. This command is effectful.
   */
  sendCommand(command: "Pause.getObjectProperty", parameters: getObjectPropertyParameters, sessionId: SessionId): getObjectPropertyResult;

  /**
   * Call a function object. This command is effectful.
   */
  sendCommand(command: "Pause.callFunction", parameters: callFunctionParameters, sessionId: SessionId): callFunctionResult;

  /**
   * Read a property from an object, then call the result. This command is effectful.
   */
  sendCommand(command: "Pause.callObjectProperty", parameters: callObjectPropertyParameters, sessionId: SessionId): callObjectPropertyResult;

  /**
   * Load a complete preview for an object.
   */
  sendCommand(command: "Pause.getObjectPreview", parameters: getObjectPreviewParameters, sessionId: SessionId): getObjectPreviewResult;

  /**
   * Load a scope's contents.
   */
  sendCommand(command: "Pause.getScope", parameters: getScopeParameters, sessionId: SessionId): getScopeResult;

  /**
   * Get the topmost frame on the stack.
   */
  sendCommand(command: "Pause.getTopFrame", parameters: getTopFrameParameters, sessionId: SessionId): getTopFrameResult;

  /**
   * Get all frames on the stack.
   */
  sendCommand(command: "Pause.getAllFrames", parameters: getAllFramesParameters, sessionId: SessionId): getAllFramesResult;

  /**
   * Get the values of a frame's arguments.
   */
  sendCommand(command: "Pause.getFrameArguments", parameters: getFrameArgumentsParameters, sessionId: SessionId): getFrameArgumentsResult;

  /**
   * Get the points of all steps that are executed by a frame.
   */
  sendCommand(command: "Pause.getFrameSteps", parameters: getFrameStepsParameters, sessionId: SessionId): getFrameStepsResult;

  /**
   * Get any exception that is being thrown at this point.
   */
  sendCommand(command: "Pause.getExceptionValue", parameters: getExceptionValueParameters, sessionId: SessionId): getExceptionValueResult;

  /**
   * Get the page's root document.
   */
  sendCommand(command: "DOM.getDocument", parameters: getDocumentParameters, sessionId: SessionId): getDocumentResult;

  /**
   * Load previews for an object and its transitive parents up to the
   * root document.
   */
  sendCommand(command: "DOM.getParentNodes", parameters: getParentNodesParameters, sessionId: SessionId): getParentNodesResult;

  /**
   * Call querySelector() on a node in the page.
   */
  sendCommand(command: "DOM.querySelector", parameters: querySelectorParameters, sessionId: SessionId): querySelectorResult;

  /**
   * Get the event listeners attached to a node in the page.
   */
  sendCommand(command: "DOM.getEventListeners", parameters: getEventListenersParameters, sessionId: SessionId): getEventListenersResult;

  /**
   * Get boxes for a node.
   */
  sendCommand(command: "DOM.getBoxModel", parameters: getBoxModelParameters, sessionId: SessionId): getBoxModelResult;

  /**
   * Get the bounding client rect for a node.
   */
  sendCommand(command: "DOM.getBoundingClientRect", parameters: getBoundingClientRectParameters, sessionId: SessionId): getBoundingClientRectResult;

  /**
   * Get the bounding client rect for all elements on the page.
   */
  sendCommand(command: "DOM.getAllBoundingClientRects", parameters: getAllBoundingClientRectsParameters, sessionId: SessionId): getAllBoundingClientRectsResult;

  /**
   * Search the DOM for nodes containing a string.
   */
  sendCommand(command: "DOM.performSearch", parameters: performSearchParameters, sessionId: SessionId): performSearchResult;

  /**
   * Get the styles computed for a node.
   */
  sendCommand(command: "CSS.getComputedStyle", parameters: getComputedStyleParameters, sessionId: SessionId): getComputedStyleResult;

  /**
   * Get the style rules being applied to a node.
   */
  sendCommand(command: "CSS.getAppliedRules", parameters: getAppliedRulesParameters, sessionId: SessionId): getAppliedRulesResult;

  /**
   * Start specifying a new analysis.
   */
  sendCommand(command: "Analysis.createAnalysis", parameters: createAnalysisParameters, sessionId: SessionId): createAnalysisResult;

  /**
   * Apply the analysis to every point where a script location executes.
   */
  sendCommand(command: "Analysis.addLocation", parameters: addLocationParameters, sessionId: SessionId): addLocationResult;

  /**
   * Apply the analysis to every function entry point in a region of a script.
   */
  sendCommand(command: "Analysis.addFunctionEntryPoints", parameters: addFunctionEntryPointsParameters, sessionId: SessionId): addFunctionEntryPointsResult;

  /**
   * Apply the analysis to a random selection of points.
   */
  sendCommand(command: "Analysis.addRandomPoints", parameters: addRandomPointsParameters, sessionId: SessionId): addRandomPointsResult;

  /**
   * Apply the analysis to the entry point of every handler for an event.
   */
  sendCommand(command: "Analysis.addEventHandlerEntryPoints", parameters: addEventHandlerEntryPointsParameters, sessionId: SessionId): addEventHandlerEntryPointsResult;

  /**
   * Apply the analysis to every point where an exception is thrown.
   */
  sendCommand(command: "Analysis.addExceptionPoints", parameters: addExceptionPointsParameters, sessionId: SessionId): addExceptionPointsResult;

  /**
   * Run the analysis. After this is called, <code>analysisResult</code> and/or
   * <code>analysisError</code> events will be emitted as results are gathered.
   * Does not return until the analysis has finished and all events have been
   * emitted.
   */
  sendCommand(command: "Analysis.runAnalysis", parameters: runAnalysisParameters, sessionId: SessionId): runAnalysisResult;

  /**
   * Release an analysis and its server side resources. If the analysis is
   * running, it will be canceled, preventing further <code>analysisResult</code>
   * and <code>analysisError</code> events from being emitted.
   */
  sendCommand(command: "Analysis.releaseAnalysis", parameters: releaseAnalysisParameters, sessionId: SessionId): releaseAnalysisResult;

  /**
   * Find the set of execution points at which an analysis will run. After this
   * is called, <code>analysisPoints</code> events will be emitted as the points
   * are found. Does not return until events for all points have been emitted.
   * Can only be used after the analysis has started running.
   */
  sendCommand(command: "Analysis.findAnalysisPoints", parameters: findAnalysisPointsParameters, sessionId: SessionId): findAnalysisPointsResult;

  /**
   * Create a new recording.
   */
  sendCommand(command: "Internal.createRecording", parameters: createRecordingParameters, sessionId: SessionId): createRecordingResult;

  /**
   * Add data to a recording. The next message sent after this must be a binary
   * message with the data described by this message. Uploaded recordings are not
   * explicitly finished; replay sessions created for a recording will include
   * all data which was successfully uploaded.
   */
  sendCommand(command: "Internal.addRecordingData", parameters: addRecordingDataParameters, sessionId: SessionId): addRecordingDataResult;

  /**
   * Add metadata about a recording.
   */
  sendCommand(command: "Internal.addRecordingDescription", parameters: addRecordingDescriptionParameters, sessionId: SessionId): addRecordingDescriptionResult;

  /**
   * Determine whether a resource is known to the cloud service.
   */
  sendCommand(command: "Internal.hasResource", parameters: hasResourceParameters, sessionId: SessionId): hasResourceResult;

  /**
   * Upload a resource's contents to the cloud service.
   */
  sendCommand(command: "Internal.addResource", parameters: addResourceParameters, sessionId: SessionId): addResourceResult;

  /**
   * Associate a resource with a recording.
   */
  sendCommand(command: "Internal.addRecordingResource", parameters: addRecordingResourceParameters, sessionId: SessionId): addRecordingResourceResult;

  /**
   * Get filters for where to add more detailed assertions when recording that
   * behavior is consistent with the replay. These are used when analyzing crashes.
   */
  sendCommand(command: "Internal.getAssertionFilters", parameters: getAssertionFiltersParameters, sessionId: SessionId): getAssertionFiltersResult;

  /**
   * For testing network issues.
   */
  sendCommand(command: "Internal.echo", parameters: echoParameters, sessionId: SessionId): echoResult;

  /**
   * Get the function ID / offset to use for a script location.
   */
  sendCommand(command: "Internal.convertLocationToFunctionOffset", parameters: convertLocationToFunctionOffsetParameters, sessionId: SessionId): convertLocationToFunctionOffsetResult;

  /**
   * Get the location to use for a function ID / offset.
   */
  sendCommand(command: "Internal.convertFunctionOffsetToLocation", parameters: convertFunctionOffsetToLocationParameters, sessionId: SessionId): convertFunctionOffsetToLocationResult;

  /**
   * Mark a session which was created for an automated test.
   */
  sendCommand(command: "Internal.labelTestSession", parameters: labelTestSessionParameters, sessionId: SessionId): labelTestSessionResult;

  /**
   * Get the user's recordings
   */
  sendCommand(command: "Internal.getRecordings", parameters: getRecordingsParameters, sessionId: SessionId): getRecordingsResult;

}
