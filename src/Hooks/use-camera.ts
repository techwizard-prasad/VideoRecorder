import { notification } from "antd";
import { useRef, useState } from "react";

const useCamera = () => {
  const [api] = notification.useNotification();

  const [permission, setPermission] = useState(false);
  const [initializing, setLoading] = useState<boolean>(false);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const liveVideoFeed = useRef<HTMLVideoElement | null>(null);

  const getCameraPermission = async () => {
    setLoading(true)
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: {
            height: 350,
            width: 400
          },

        };
        const audioConstraints = { audio: true };
        // create audio and video streams separately
        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        setPermission(true);
        //combine both audio and video streams
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        setStream(combinedStream);

        //set videostream to live feed player
        if (liveVideoFeed.current) {
            console.log("videoStream", videoStream)
          liveVideoFeed.current.srcObject = videoStream;
        }
      } catch (err: unknown) {
        api.error({
          message: "Failed to load camera!",
          description: (err as { message: string }).message,
        });
      }finally{
        setLoading(false);
      }
    } else {
      api.error({
        message: "Failed to load camera!",
        description: "The MediaRecorder API is not supported in your browser.",
      });
      setLoading(false)
    }
  };

  return {
    permission, stream , liveVideoFeed, getCameraPermission, setPermission, initializing
  }
};

export default useCamera;
