import {
  BuildId,
  RecordingId,
  TimeStamp
} from "./Recording";
import {
  MimeType
} from "./Graphics";
import {
  SessionId
} from "./Session";

/**
 * Information about a file based resource. Currently, resources are used for
 * source maps and original sources.
 */
export interface Resource {

  /**
   * URL of the resource.
   */
  url: string;

  /**
   * Checksum of the resource's contents.
   */
  checksum: string;
}

export interface createRecordingParameters {

  /**
   * Build Id of the software which produced the recording.
   */
  buildId: BuildId;
}

export interface createRecordingResult {

  /**
   * Identifier for the recording.
   */
  recordingId: RecordingId;
}

export interface addRecordingDataParameters {

  /**
   * ID of the recording data is being added to. This recording must have
   * been produced by a createRecording command previously sent on this
   * connection.
   */
  recordingId: RecordingId;

  /**
   * Byte offset into the recording's blob of the data being sent.
   */
  offset: number;

  /**
   * Byte length of the data being sent.
   */
  length: number;
}

export interface addRecordingDataResult {

}

export interface addRecordingDescriptionParameters {

  /**
   * ID of the recording being described.
   */
  recordingId: RecordingId;

  /**
   * Total byte length of the recording.
   */
  length: number;

  /**
   * Duration of the entire recording.
   */
  duration: TimeStamp;

  /**
   * Mime type for graphics data at the end of the recording.
   */
  lastScreenMimeType?: MimeType;

  /**
   * Raw graphics data for the end of the recording.
   */
  lastScreenData?: string;

  /**
   * Any command line arguments associated with the recording.
   */
  commandLineArguments?: string[];
}

export interface addRecordingDescriptionResult {

}

export interface hasResourceParameters {

  /**
   * Resource to look for.
   */
  resource: Resource;
}

export interface hasResourceResult {

  /**
   * Whether the resource's contents are known.
   */
  known: boolean;
}

export interface addResourceParameters {

  /**
   * Resource to add.
   */
  resource: Resource;

  /**
   * Text contents of the resource.
   */
  contents: string;
}

export interface addResourceResult {

}

export interface addRecordingResourceParameters {

  /**
   * ID of the recording.
   */
  recordingId: RecordingId;

  /**
   * Resource which the recording is associated with.
   */
  resource: Resource;
}

export interface addRecordingResourceResult {

}

export interface getAssertionFiltersParameters {

}

export interface getAssertionFiltersResult {

  filters?: any;
}

export interface echoParameters {

  str: string;

  count: number;
}

export interface echoResult {

  str: string;
}

export interface labelTestSessionParameters {

  sessionId: SessionId;
}

export interface labelTestSessionResult {

}

export interface getRecordingsParameters {

  authId: string;
}

export interface getRecordingsResult {

  recordings: any[];
}
