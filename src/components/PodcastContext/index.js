import React from 'react';

const PodcastContext = React.createContext({
  url: ``,
  title: ``,
  setPodcastState: () => null,
  setPlayState: () => null,
});

export default PodcastContext;
