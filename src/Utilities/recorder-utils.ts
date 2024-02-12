// Constants 
export enum RecordingStatus {
    INACTIVE = "inactive",
    RECORDING = "recording",
    PAUSED = "paused"
}


// Helper Functions
export const getRecorderOptions = () => {
    if (MediaRecorder.isTypeSupported("video/webm; codecs=vp9")) {
      return { mimeType: "video/webm; codecs=vp9" };
    } else if (MediaRecorder.isTypeSupported("video/webm")) {
      return { mimeType: "video/webm" };
    } else if (MediaRecorder.isTypeSupported("video/mp4")) {
      return { mimeType: "video/mp4", videoBitsPerSecond: 100000 };
    }
  };