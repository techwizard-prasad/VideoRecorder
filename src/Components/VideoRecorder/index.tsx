import { useMemo } from "react";

import { Typography } from "antd";

import useRecorder from "../../Hooks/use-recorder";
import useCamera from "../../Hooks/use-camera";

import CameraUnauthorised from "../CameraUnauthorised";
import VideoControls from "../VideoControls";

import { RecordingStatus } from "../../Utilities/recorder-utils";

import style from "./styles.module.scss";

const VideoRecorder = () => {
  const {
    permission,
    getCameraPermission,
    liveVideoFeed,
    stream,
    initializing,
  } = useCamera();
  const { recordedVideo, recordingStatus, startRecording, stopRecording, pauseRecording, resumeRecording } =
    useRecorder({ stream });

  const secondaryClass = useMemo(() => {
    if (!permission) {
      return style.noPermission;
    }

    if (permission && recordingStatus === RecordingStatus.RECORDING) {
      return style.recording;
    }
  }, [permission, recordingStatus]);


  return (
    <div>
      <Typography.Title level={2}>Video Recorder</Typography.Title>
      <main className={`${style.videoRecorder} ${secondaryClass}`}>
        {!permission ? (
          <CameraUnauthorised
            getCameraPermission={getCameraPermission}
            loading={initializing}
          />
        ) : null}

        <div>
            <div>
              <video
                ref={liveVideoFeed}
                onCanPlay={() => {
                  liveVideoFeed.current?.play();
                }}
                autoPlay
                playsInline
                muted
              />
            </div>

          {permission && (
            <VideoControls
              loading={initializing}
              recordingStatus={recordingStatus}
              videoURL={recordedVideo}
              startRecording={startRecording}
              stopRecording={stopRecording}
              pauseRecording={pauseRecording}
              resumeRecording={resumeRecording}
            />
          )}
        </div>
      </main>
    </div>
  );
};
export default VideoRecorder;
