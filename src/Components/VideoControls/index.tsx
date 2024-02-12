import {
  DownloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { RecordingStatus } from "../../Utilities/recorder-utils";
import React from "react";

interface IVideoControl {
  recordingStatus: RecordingStatus;
  loading: boolean;
  videoURL: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
}

const VideoControls: React.FC<IVideoControl> = ({
  loading,
  recordingStatus,
  startRecording,
  stopRecording,
  pauseRecording,
  resumeRecording,
  videoURL,
}) => {
  return (
    <Space>
      {recordingStatus === RecordingStatus.INACTIVE ? (
        <Button
          type="primary"
          onClick={startRecording}
          loading={loading}
          icon={<PlayCircleOutlined />}
        >
          Start Recording
        </Button>
      ) : null}

      {recordingStatus === RecordingStatus.RECORDING ? (
        <Button
          type="primary"
          onClick={pauseRecording}
          loading={loading}
          icon={<PauseCircleOutlined />}
        >
          Pause Recording
        </Button>
      ) : null}

      {recordingStatus === RecordingStatus.PAUSED ? (
        <Button
          onClick={resumeRecording}
          type="primary"
          loading={loading}
          icon={<PlayCircleOutlined />}
        >
          Resume Recording
        </Button>
      ) : null}

      {recordingStatus === RecordingStatus.RECORDING ? (
        <Button
          onClick={stopRecording}
          danger
          loading={loading}
          icon={<StopOutlined />}
        >
          Stop Recording
        </Button>
      ) : null}

      {videoURL ? (
        <Button
          href={videoURL}
          target="_blank"
          loading={loading}
          icon={<DownloadOutlined />}
          download={true}
        >
          Download Recording
        </Button>
      ) : null}

      
    </Space>
  );
};

export default VideoControls;
