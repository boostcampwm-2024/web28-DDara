// components/VideoPlayer.jsx
import React from 'react';

const VideoPlayer = ({ src, width = 640, height = 480, controls = true }) => {
  return (
    <video width={width} height={height} controls={controls}>
      <source src={src} type="video/mp4" />
      이 브라우저는 비디오 태그를 지원하지 않습니다.
    </video>
  );
};

export default VideoPlayer;