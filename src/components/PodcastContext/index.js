import React from 'react';

const PodcastContext = React.createContext({
  url: ``,
  setPodcastState: () => null,
  setPlayState: () => null,
});

export default PodcastContext;
