import React from 'react';
import ReactPlayer from 'react-player';

const YouTubePreview = ({ url }) => {
  return (
    <div className="youtube-preview">
      <ReactPlayer url={url} controls={true} width="100%" height="100%" />
    </div>
  );
};

export default YouTubePreview;