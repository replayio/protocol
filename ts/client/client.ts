import {
  metadataChange,
  uploadedData,
  sessionError,
  getDescriptionParameters,
  getMetadataParameters,
  setMetadataParameters,
  metadataStartListeningParameters,
  metadataStopListeningParameters,
  createSessionParameters,
  releaseSessionParameters,
  processRecordingParameters
} from "../protocol/Recording";
import {
  missingRegions,
  unprocessedRegions,
  mouseEvents,
  ensureProcessedParameters,
  findMouseEventsParameters,
  getEndpointParameters,
  createPauseParameters,
  releasePauseParameters,
  SessionId
} from "../protocol/Session";
import {
  paintPoints,
  findPaintsParameters,
  getPaintContentsParameters,
  getDevicePixelRatioParameters
} from "../protocol/Graphics";
import {
  scriptParsed,
  findScriptsParameters,
  getScriptSourceParameters,
  getPossibleBreakpointsParameters,
  getMappedLocationParameters,
  setBreakpointParameters,
  removeBreakpointParameters,
  findResumeTargetParameters,
  findRewindTargetParameters,
  findReverseStepOverTargetParameters,
  findStepOverTargetParameters,
  findStepInTargetParameters,
  findStepOutTargetParameters,
  blackboxScriptParameters,
  unblackboxScriptParameters
} from "../protocol/Debugger";
import {
  newMessage,
  findMessagesParameters
} from "../protocol/Console";
import {
  evaluateInFrameParameters,
  evaluateInGlobalParameters,
  getObjectPropertyParameters,
  callFunctionParameters,
  callObjectPropertyParameters,
  getObjectPreviewParameters,
  getScopeParameters,
  getTopFrameParameters,
  getAllFramesParameters,
  getFrameArgumentsParameters,
  getFrameStepsParameters,
  getExceptionValueParameters
} from "../protocol/Pause";
import {
  getDocumentParameters,
  getParentNodesParameters,
  querySelectorParameters,
  getEventListenersParameters,
  getBoxModelParameters,
  getBoundingClientRectParameters,
  getAllBoundingClientRectsParameters,
  performSearchParameters
} from "../protocol/DOM";
import {
  getComputedStyleParameters,
  getAppliedRulesParameters
} from "../protocol/CSS";
import {
  analysisResult,
  analysisError,
  analysisPoints,
  createAnalysisParameters,
  addLocationParameters,
  addFunctionEntryPointsParameters,
  addRandomPointsParameters,
  addEventHandlerEntryPointsParameters,
  addExceptionPointsParameters,
  runAnalysisParameters,
  releaseAnalysisParameters,
  findAnalysisPointsParameters
} from "../protocol/Analysis";
import {
  createRecordingParameters,
  addRecordingDataParameters,
  addRecordingDescriptionParameters,
  hasResourceParameters,
  addResourceParameters,
  addRecordingResourceParameters,
  getAssertionFiltersParameters,
  echoParameters,
  convertLocationToFunctionOffsetParameters,
  convertFunctionOffsetToLocationParameters,
  getHTMLSourceParameters,
  labelTestSessionParameters,
  getRecordingsParameters
} from "../protocol/Internal";
import { GenericProtocolClient } from "./generic";

export class ProtocolClient {
  constructor(
    private readonly genericClient: GenericProtocolClient
  ) {}

  /**
   * The Recording domain defines methods for managing recordings.
   */
  Recording = {

    /**
     * Describes a change to an entry in a recording's metadata.
     */
    addMetadataChangeListener: (listener: (parameters: metadataChange) => void) =>
      this.genericClient.addEventListener("Recording.metadataChange", listener),

    removeMetadataChangeListener: () =>
      this.genericClient.removeEventListener("Recording.metadataChange"),

    /**
     * Describes how much of a recording's data has been uploaded to the cloud service.
     */
    addUploadedDataListener: (listener: (parameters: uploadedData) => void) =>
      this.genericClient.addEventListener("Recording.uploadedData", listener),

    removeUploadedDataListener: () =>
      this.genericClient.removeEventListener("Recording.uploadedData"),

    /**
     * Emitted when a session has died due to a server side problem.
     */
    addSessionErrorListener: (listener: (parameters: sessionError) => void) =>
      this.genericClient.addEventListener("Recording.sessionError", listener),

    removeSessionErrorListener: () =>
      this.genericClient.removeEventListener("Recording.sessionError"),

    /**
     * Get a description of a recording.
     */
    getDescription: (parameters: getDescriptionParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.getDescription", parameters, sessionId),

    /**
     * Get an entry in a recording's metadata key/value store.
     */
    getMetadata: (parameters: getMetadataParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.getMetadata", parameters, sessionId),

    /**
     * Set an entry in a recording's metadata.
     */
    setMetadata: (parameters: setMetadataParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.setMetadata", parameters, sessionId),

    /**
     * Listen for changes to an entry in a recording's metadata. When listening,
     * <code>metadataChange</code> events will be emitted whenever the entry's
     * value changes.
     */
    metadataStartListening: (parameters: metadataStartListeningParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.metadataStartListening", parameters, sessionId),

    /**
     * Stop listening for changes to an entry in a recording's metadata.
     */
    metadataStopListening: (parameters: metadataStopListeningParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.metadataStopListening", parameters, sessionId),

    /**
     * Create a session for inspecting a recording. This command does not return
     * until the recording's contents have been fully received. If the contents
     * are incomplete, <code>uploadedData</code> events will be periodically
     * emitted before the command returns. After creating, a <code>sessionError</code>
     * events may be emitted later if the session dies unexpectedly.
     */
    createSession: (parameters: createSessionParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.createSession", parameters, sessionId),

    /**
     * Release a session and allow its resources to be reclaimed.
     */
    releaseSession: (parameters: releaseSessionParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.releaseSession", parameters, sessionId),

    /**
     * Begin processing a recording, even if no sessions have been created for it.
     * After calling this, sessions created for the recording (on this connection,
     * or another) may start in a partially or fully processed state and start
     * being used immediately.
     */
    processRecording: (parameters: processRecordingParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Recording.processRecording", parameters, sessionId),
  }

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
  Session = {

    /**
     * Event describing regions of the recording that have not been uploaded.
     */
    addMissingRegionsListener: (listener: (parameters: missingRegions) => void) =>
      this.genericClient.addEventListener("Session.missingRegions", listener),

    removeMissingRegionsListener: () =>
      this.genericClient.removeEventListener("Session.missingRegions"),

    /**
     * Event describing regions of the recording that have not been processed.
     */
    addUnprocessedRegionsListener: (listener: (parameters: unprocessedRegions) => void) =>
      this.genericClient.addEventListener("Session.unprocessedRegions", listener),

    removeUnprocessedRegionsListener: () =>
      this.genericClient.removeEventListener("Session.unprocessedRegions"),

    /**
     * Describes some mouse events that occur in the recording.
     */
    addMouseEventsListener: (listener: (parameters: mouseEvents) => void) =>
      this.genericClient.addEventListener("Session.mouseEvents", listener),

    removeMouseEventsListener: () =>
      this.genericClient.removeEventListener("Session.mouseEvents"),

    /**
     * Does not return until the recording is fully processed. Before returning,
     * <code>missingRegions</code> and <code>unprocessedRegions</code> events will
     * be periodically emitted.
     */
    ensureProcessed: (parameters: ensureProcessedParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Session.ensureProcessed", parameters, sessionId),

    /**
     * Find all points in the recording at which a mouse move or click occurred.
     * Does not return until the recording is fully processed. Before returning,
     * <code>mouseEvents</code> events will be periodically emitted. The union
     * of all these events describes all mouse events in the recording.
     */
    findMouseEvents: (parameters: findMouseEventsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Session.findMouseEvents", parameters, sessionId),

    /**
     * Get the last execution point in the recording.
     */
    getEndpoint: (parameters: getEndpointParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Session.getEndpoint", parameters, sessionId),

    /**
     * Create a pause describing the state at an execution point.
     */
    createPause: (parameters: createPauseParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Session.createPause", parameters, sessionId),

    /**
     * Release a pause and allow its resources to be reclaimed.
     */
    releasePause: (parameters: releasePauseParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Session.releasePause", parameters, sessionId),
  }

  /**
   * The Graphics domain defines methods for accessing a recording's graphics data.
   * 
   * <br><br>All commands and events in this domain must include a <code>sessionId</code>.
   */
  Graphics = {

    /**
     * Describes some points in the recording at which paints occurred. No paint
     * will occur for the recording's beginning execution point.
     */
    addPaintPointsListener: (listener: (parameters: paintPoints) => void) =>
      this.genericClient.addEventListener("Graphics.paintPoints", listener),

    removePaintPointsListener: () =>
      this.genericClient.removeEventListener("Graphics.paintPoints"),

    /**
     * Find all points in the recording at which paints occurred. Does not return
     * until the recording is fully processed. Before returning,
     * <code>paintPoints</code> events will be periodically emitted. The union
     * of all these events describes all paint points in the recording.
     */
    findPaints: (parameters: findPaintsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Graphics.findPaints", parameters, sessionId),

    /**
     * Get the graphics at a point where a paint occurred.
     */
    getPaintContents: (parameters: getPaintContentsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Graphics.getPaintContents", parameters, sessionId),

    /**
     * Get the value of <code>window.devicePixelRatio</code>. This is the ratio of
     * pixels in screen shots to pixels used by DOM/CSS data such as
     * <code>DOM.getBoundingClientRect</code>.
     */
    getDevicePixelRatio: (parameters: getDevicePixelRatioParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Graphics.getDevicePixelRatio", parameters, sessionId),
  }

  /**
   * The Debugger domain defines methods for accessing JS scripts and navigating
   * around the recording using breakpoints, stepping, and so forth.
   * 
   * <br><br>All commands and events in this domain must include a <code>sessionId</code>.
   */
  Debugger = {

    /**
     * Describes a script that was successfully parsed.
     */
    addScriptParsedListener: (listener: (parameters: scriptParsed) => void) =>
      this.genericClient.addEventListener("Debugger.scriptParsed", listener),

    removeScriptParsedListener: () =>
      this.genericClient.removeEventListener("Debugger.scriptParsed"),

    /**
     * Find all scripts in the recording. Does not return until the recording is
     * fully processed. Before returning, <code>scriptParsed</code> events will be
     * emitted for every script in the recording.
     */
    findScripts: (parameters: findScriptsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.findScripts", parameters, sessionId),

    /**
     * Get the source contents of a script.
     */
    getScriptSource: (parameters: getScriptSourceParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.getScriptSource", parameters, sessionId),

    /**
     * Get a compact representation of the locations where breakpoints can be set
     * in a region of a script.
     */
    getPossibleBreakpoints: (parameters: getPossibleBreakpointsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.getPossibleBreakpoints", parameters, sessionId),

    /**
     * Get the mapped location for a script location.
     */
    getMappedLocation: (parameters: getMappedLocationParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.getMappedLocation", parameters, sessionId),

    /**
     * Set a breakpoint at a location.
     */
    setBreakpoint: (parameters: setBreakpointParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.setBreakpoint", parameters, sessionId),

    /**
     * Remove a breakpoint.
     */
    removeBreakpoint: (parameters: removeBreakpointParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.removeBreakpoint", parameters, sessionId),

    /**
     * Find where to pause when running forward from a point.
     */
    findResumeTarget: (parameters: findResumeTargetParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.findResumeTarget", parameters, sessionId),

    /**
     * Find where to pause when rewinding from a point.
     */
    findRewindTarget: (parameters: findRewindTargetParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.findRewindTarget", parameters, sessionId),

    /**
     * Find where to pause when reverse-stepping from a point.
     */
    findReverseStepOverTarget: (parameters: findReverseStepOverTargetParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.findReverseStepOverTarget", parameters, sessionId),

    /**
     * Find where to pause when stepping from a point.
     */
    findStepOverTarget: (parameters: findStepOverTargetParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.findStepOverTarget", parameters, sessionId),

    /**
     * Find where to pause when stepping from a point and stopping at the entry of
     * any encountered call.
     */
    findStepInTarget: (parameters: findStepInTargetParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.findStepInTarget", parameters, sessionId),

    /**
     * Find where to pause when stepping out from a frame to the caller.
     */
    findStepOutTarget: (parameters: findStepOutTargetParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.findStepOutTarget", parameters, sessionId),

    /**
     * Blackbox a script or a region in it. Resume commands like
     * <code>findResumeTarget</code> will not return execution points in
     * blackboxed regions of a script.
     */
    blackboxScript: (parameters: blackboxScriptParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.blackboxScript", parameters, sessionId),

    /**
     * Unblackbox a script or a region in it.
     */
    unblackboxScript: (parameters: unblackboxScriptParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Debugger.unblackboxScript", parameters, sessionId),
  }

  /**
   * The Console domain defines methods for accessing messages reported to the console.
   * 
   * <br><br>All commands and events in this domain must include a <code>sessionId</code>.
   */
  Console = {

    /**
     * Describes a console message in the recording.
     */
    addNewMessageListener: (listener: (parameters: newMessage) => void) =>
      this.genericClient.addEventListener("Console.newMessage", listener),

    removeNewMessageListener: () =>
      this.genericClient.removeEventListener("Console.newMessage"),

    /**
     * Find all messages in the recording. Does not return until the recording is
     * fully processed. Before returning, <code>newMessage</code> events will be
     * emitted for every console message in the recording.
     */
    findMessages: (parameters: findMessagesParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Console.findMessages", parameters, sessionId),
  }

  /**
   * The Pause domain is used to inspect the state of the program when it is paused
   * at particular execution points.
   * 
   * <br><br>All commands and events in this domain must include both a <code>sessionId</code>
   * and a <code>pauseId</code>.
   */
  Pause = {

    /**
     * Evaluate an expression in the context of a call frame. This command is
     * effectful.
     */
    evaluateInFrame: (parameters: evaluateInFrameParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.evaluateInFrame", parameters, sessionId),

    /**
     * Evaluate an expression in a global context. This command is effectful.
     */
    evaluateInGlobal: (parameters: evaluateInGlobalParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.evaluateInGlobal", parameters, sessionId),

    /**
     * Read a property from an object. This command is effectful.
     */
    getObjectProperty: (parameters: getObjectPropertyParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getObjectProperty", parameters, sessionId),

    /**
     * Call a function object. This command is effectful.
     */
    callFunction: (parameters: callFunctionParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.callFunction", parameters, sessionId),

    /**
     * Read a property from an object, then call the result. This command is effectful.
     */
    callObjectProperty: (parameters: callObjectPropertyParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.callObjectProperty", parameters, sessionId),

    /**
     * Load a complete preview for an object.
     */
    getObjectPreview: (parameters: getObjectPreviewParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getObjectPreview", parameters, sessionId),

    /**
     * Load a scope's contents.
     */
    getScope: (parameters: getScopeParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getScope", parameters, sessionId),

    /**
     * Get the topmost frame on the stack.
     */
    getTopFrame: (parameters: getTopFrameParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getTopFrame", parameters, sessionId),

    /**
     * Get all frames on the stack.
     */
    getAllFrames: (parameters: getAllFramesParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getAllFrames", parameters, sessionId),

    /**
     * Get the values of a frame's arguments.
     */
    getFrameArguments: (parameters: getFrameArgumentsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getFrameArguments", parameters, sessionId),

    /**
     * Get the points of all steps that are executed by a frame.
     */
    getFrameSteps: (parameters: getFrameStepsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getFrameSteps", parameters, sessionId),

    /**
     * Get any exception that is being thrown at this point.
     */
    getExceptionValue: (parameters: getExceptionValueParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Pause.getExceptionValue", parameters, sessionId),
  }

  /**
   * The DOM domain is used to inspect the DOM at particular execution points.
   * Inspecting the DOM requires a <code>Pause.PauseId</code>, and DOM nodes
   * are identified by a <code>Pause.ObjectId</code>.
   * 
   * <br><br>All commands and events in this domain must include both a <code>sessionId</code>
   * and a <code>pauseId</code>.
   */
  DOM = {

    /**
     * Get the page's root document.
     */
    getDocument: (parameters: getDocumentParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.getDocument", parameters, sessionId),

    /**
     * Load previews for an object and its transitive parents up to the
     * root document.
     */
    getParentNodes: (parameters: getParentNodesParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.getParentNodes", parameters, sessionId),

    /**
     * Call querySelector() on a node in the page.
     */
    querySelector: (parameters: querySelectorParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.querySelector", parameters, sessionId),

    /**
     * Get the event listeners attached to a node in the page.
     */
    getEventListeners: (parameters: getEventListenersParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.getEventListeners", parameters, sessionId),

    /**
     * Get boxes for a node.
     */
    getBoxModel: (parameters: getBoxModelParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.getBoxModel", parameters, sessionId),

    /**
     * Get the bounding client rect for a node.
     */
    getBoundingClientRect: (parameters: getBoundingClientRectParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.getBoundingClientRect", parameters, sessionId),

    /**
     * Get the bounding client rect for all elements on the page.
     */
    getAllBoundingClientRects: (parameters: getAllBoundingClientRectsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.getAllBoundingClientRects", parameters, sessionId),

    /**
     * Search the DOM for nodes containing a string.
     */
    performSearch: (parameters: performSearchParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("DOM.performSearch", parameters, sessionId),
  }

  /**
   * The CSS domain is used to inspect the CSS state at particular execution points.
   * 
   * <br><br>All commands and events in this domain must include both a <code>sessionId</code>
   * and a <code>pauseId</code>.
   */
  CSS = {

    /**
     * Get the styles computed for a node.
     */
    getComputedStyle: (parameters: getComputedStyleParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("CSS.getComputedStyle", parameters, sessionId),

    /**
     * Get the style rules being applied to a node.
     */
    getAppliedRules: (parameters: getAppliedRulesParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("CSS.getAppliedRules", parameters, sessionId),
  }

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
  Analysis = {

    /**
     * Describes some results of an analysis.
     */
    addAnalysisResultListener: (listener: (parameters: analysisResult) => void) =>
      this.genericClient.addEventListener("Analysis.analysisResult", listener),

    removeAnalysisResultListener: () =>
      this.genericClient.removeEventListener("Analysis.analysisResult"),

    /**
     * Describes an error that occurred when running an analysis mapper or reducer
     * function. This will not be emitted for every error, but if there was any
     * error then at least one event will be emitted.
     */
    addAnalysisErrorListener: (listener: (parameters: analysisError) => void) =>
      this.genericClient.addEventListener("Analysis.analysisError", listener),

    removeAnalysisErrorListener: () =>
      this.genericClient.removeEventListener("Analysis.analysisError"),

    /**
     * Describes some points at which an analysis will run.
     */
    addAnalysisPointsListener: (listener: (parameters: analysisPoints) => void) =>
      this.genericClient.addEventListener("Analysis.analysisPoints", listener),

    removeAnalysisPointsListener: () =>
      this.genericClient.removeEventListener("Analysis.analysisPoints"),

    /**
     * Start specifying a new analysis.
     */
    createAnalysis: (parameters: createAnalysisParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.createAnalysis", parameters, sessionId),

    /**
     * Apply the analysis to every point where a script location executes.
     */
    addLocation: (parameters: addLocationParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.addLocation", parameters, sessionId),

    /**
     * Apply the analysis to every function entry point in a region of a script.
     */
    addFunctionEntryPoints: (parameters: addFunctionEntryPointsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.addFunctionEntryPoints", parameters, sessionId),

    /**
     * Apply the analysis to a random selection of points.
     */
    addRandomPoints: (parameters: addRandomPointsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.addRandomPoints", parameters, sessionId),

    /**
     * Apply the analysis to the entry point of every handler for an event.
     */
    addEventHandlerEntryPoints: (parameters: addEventHandlerEntryPointsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.addEventHandlerEntryPoints", parameters, sessionId),

    /**
     * Apply the analysis to every point where an exception is thrown.
     */
    addExceptionPoints: (parameters: addExceptionPointsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.addExceptionPoints", parameters, sessionId),

    /**
     * Run the analysis. After this is called, <code>analysisResult</code> and/or
     * <code>analysisError</code> events will be emitted as results are gathered.
     * Does not return until the analysis has finished and all events have been
     * emitted.
     */
    runAnalysis: (parameters: runAnalysisParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.runAnalysis", parameters, sessionId),

    /**
     * Release an analysis and its server side resources. If the analysis is
     * running, it will be canceled, preventing further <code>analysisResult</code>
     * and <code>analysisError</code> events from being emitted.
     */
    releaseAnalysis: (parameters: releaseAnalysisParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.releaseAnalysis", parameters, sessionId),

    /**
     * Find the set of execution points at which an analysis will run. After this
     * is called, <code>analysisPoints</code> events will be emitted as the points
     * are found. Does not return until events for all points have been emitted.
     * Can only be used after the analysis has started running.
     */
    findAnalysisPoints: (parameters: findAnalysisPointsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Analysis.findAnalysisPoints", parameters, sessionId),
  }

  /**
   * The Internal domain is for use in software that is used to create recordings
   * and for internal/diagnostic use cases. While use of this domain is not
   * restricted, it won't be very helpful for other users.
   */
  Internal = {

    /**
     * Create a new recording.
     */
    createRecording: (parameters: createRecordingParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.createRecording", parameters, sessionId),

    /**
     * Add data to a recording. The next message sent after this must be a binary
     * message with the data described by this message. Uploaded recordings are not
     * explicitly finished; replay sessions created for a recording will include
     * all data which was successfully uploaded.
     */
    addRecordingData: (parameters: addRecordingDataParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.addRecordingData", parameters, sessionId),

    /**
     * Add metadata about a recording.
     */
    addRecordingDescription: (parameters: addRecordingDescriptionParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.addRecordingDescription", parameters, sessionId),

    /**
     * Determine whether a resource is known to the cloud service.
     */
    hasResource: (parameters: hasResourceParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.hasResource", parameters, sessionId),

    /**
     * Upload a resource's contents to the cloud service.
     */
    addResource: (parameters: addResourceParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.addResource", parameters, sessionId),

    /**
     * Associate a resource with a recording.
     */
    addRecordingResource: (parameters: addRecordingResourceParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.addRecordingResource", parameters, sessionId),

    /**
     * Get filters for where to add more detailed assertions when recording that
     * behavior is consistent with the replay. These are used when analyzing crashes.
     */
    getAssertionFilters: (parameters: getAssertionFiltersParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.getAssertionFilters", parameters, sessionId),

    /**
     * For testing network issues.
     */
    echo: (parameters: echoParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.echo", parameters, sessionId),

    /**
     * Get the function ID / offset to use for a script location.
     */
    convertLocationToFunctionOffset: (parameters: convertLocationToFunctionOffsetParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.convertLocationToFunctionOffset", parameters, sessionId),

    /**
     * Get the location to use for a function ID / offset.
     */
    convertFunctionOffsetToLocation: (parameters: convertFunctionOffsetToLocationParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.convertFunctionOffsetToLocation", parameters, sessionId),

    /**
     * Get the most complete contents known for an HTML file.
     */
    getHTMLSource: (parameters: getHTMLSourceParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.getHTMLSource", parameters, sessionId),

    /**
     * Mark a session which was created for an automated test.
     */
    labelTestSession: (parameters: labelTestSessionParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.labelTestSession", parameters, sessionId),

    /**
     * Get the user's recordings
     */
    getRecordings: (parameters: getRecordingsParameters, sessionId: SessionId) =>
      this.genericClient.sendCommand("Internal.getRecordings", parameters, sessionId),
  }

}
