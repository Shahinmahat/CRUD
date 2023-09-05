import React from 'react';
import { useLocation } from 'react-router-dom';
import './VideoContainer.css';

const VideoContainer = ({ appVideo }) => {
  const location = useLocation();

  // Render the video only on the home page (root route)
  if (location.pathname === '/') {
    return (
      <div className="video-container">
        <video src={appVideo} autoPlay loop muted className="app-video" />
      </div>
    );
  }

  return null; // Do not render the video on other pages
};

export default VideoContainer;
