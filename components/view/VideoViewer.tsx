


import React, { useEffect, useRef, useState,useCallback } from 'react';

interface VideoViewerProps {
  file: string;
  viewId: string;
  documentName: string;
  allowDownload: boolean;
  currentTime: number;
  duration: number;
  assistantEnabled: boolean;
  linkId: string;
  versionNumber: string;
}

interface PlayRecord {
  time: number; // Video's currentTime when played
  timestamp: Date; // Actual timestamp when play occurred
}

const VideoViewer: React.FC<VideoViewerProps> = ({
  file,
  viewId,
  documentName,
  allowDownload,
  currentTime,
  duration,
  assistantEnabled,
  linkId,
  versionNumber
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [playRecords, setPlayRecords] = useState<PlayRecord[]>([]);

  // Function to track video view analytics
  const trackVideoView = useCallback(async (currentDuration: number) => {
    try {
      console.log("trackVideoView called with:", {
        linkId,
        documentName,
        viewId,
        versionNumber,
        duration: currentDuration,
        playRecords,
      });
  
      const sanitizedPlayRecords = playRecords.map((record) => ({
        ...record,
        time: Math.floor(record.time),
      }));
  
      const response = await fetch("/api/record_video_view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentName,
          viewId,
          versionNumber,
          duration: currentDuration,
          playRecords: sanitizedPlayRecords,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error recording video view: ${response.statusText}`);
      }
      console.log("Video view recorded successfully");
    } catch (error) {
      console.error("Failed to track video view:", error);
    }
  }, [documentName, viewId, versionNumber, playRecords, linkId]);
  

  useEffect(() => {
    const videoElement = videoRef.current;
    let interval: NodeJS.Timeout;

    if (videoElement) {
      // Start tracking when video is played
      const handlePlay = () => {
        const currentPlayTime = videoElement.currentTime;
        setPlayRecords((prev) => [
          ...prev,
          { time: currentPlayTime, timestamp: new Date() }
        ]);
        interval = setInterval(() => {
          setTimeSpent((prev) => prev + 1);
        }, 1000);
        console.log('Video started/resumed at:', currentPlayTime, 'seconds');
      };

      // Stop tracking when video is paused or ended
      const handlePause = () => {
        clearInterval(interval);
        console.log('Video paused.');
        trackVideoView(timeSpent); // Send analytics data
      };

      const handleEnded = () => {
        clearInterval(interval);
        console.log('Video ended.');
        trackVideoView(timeSpent); // Send analytics data
      };

      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('ended', handleEnded);

      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('ended', handleEnded);
        clearInterval(interval);
      };
    }
  }, [timeSpent,trackVideoView]);

  return (
    <div style={{ color: 'white' }}>
      <h1>{documentName}</h1>
      <video ref={videoRef} src={file} controls>
        Your browser does not support the video tag.
      </video>
      <div>Current Time: {currentTime}s</div>
      <div>Duration: {duration}s</div>
      <div>Assistant Enabled: {assistantEnabled ? 'Yes' : 'No'}</div>
      <div>Link ID: {linkId}</div>
      <div>Version: {versionNumber}</div>
      <div>Time Spent Watching: {timeSpent}s</div>
      <div>Play Records:</div>
      <ul>
        {playRecords.map((record, index) => (
          <li key={index}>
            Played at {record.time.toFixed(2)}s on {record.timestamp.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoViewer;
