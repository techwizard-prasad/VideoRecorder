import { notification } from "antd";
import { useRef, useState } from "react";

import useCamera from "./use-camera";

import {
  RecordingStatus,
  getRecorderOptions,
} from "../Utilities/recorder-utils";

interface IUserRecorderProps {
  stream: MediaStream | null;
}

const useRecorder = ({ stream }: IUserRecorderProps) => {
  const { permission, getCameraPermission, liveVideoFeed } = useCamera();

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState(
    RecordingStatus.INACTIVE
  );
  const [videoChunks, setVideoChunks] = useState<Array<Blob>>([]);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  const startRecording = async () => {
    const options = getRecorderOptions();
    if (!options) {
      notification.error({
        message: "Failed to start recording",
        description: "No suitable mime type is available",
      });
    }

    setRecordingStatus(RecordingStatus.RECORDING);

    const media = new MediaRecorder(stream!, options);
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    const localVideoChunk: Array<Blob> = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunk.push(event.data);
    };
    setVideoChunks(localVideoChunk);
  };

  const stopRecording = () => {
    const options = getRecorderOptions();
    setRecordingStatus(RecordingStatus.INACTIVE);
    if (!mediaRecorder || !mediaRecorder.current || !options) {
      return;
    }
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: options.mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      setRecordedVideo(videoUrl);
      setVideoChunks([]);
    };
  };

  const pauseRecording = () => {
    if (!mediaRecorder.current) {
      return;
    }
    mediaRecorder.current?.pause();
    mediaRecorder.current.onpause = () => {
      setRecordingStatus(RecordingStatus.PAUSED);
    };
  };

  const resumeRecording = () => {
    if (!mediaRecorder.current) {
      return;
    }
    mediaRecorder.current?.resume();
    mediaRecorder.current.onresume = () => {
      setRecordingStatus(RecordingStatus.RECORDING);
    };
  };

  const dowloadRecording = () => {
    if (recordedVideo) window.location.assign(recordedVideo);
  };

  return {
    permission,
    recordingStatus,
    recordedVideo,
    startRecording,
    stopRecording,
    getCameraPermission,
    liveVideoFeed,
    pauseRecording,
    resumeRecording,
    dowloadRecording,
  };
};

export default useRecorder;
