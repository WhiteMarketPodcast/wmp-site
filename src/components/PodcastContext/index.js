import React from 'react'

const PodcastContext = React.createContext({
  url: ``,
  setPodcastState: () => {},
  setPlaying: () => {},
  setBuffering: () => {},
})

export default PodcastContext
