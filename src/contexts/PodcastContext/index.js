import React, { useCallback, useReducer } from 'react'
import { node } from 'prop-types'

const PodcastContext = React.createContext({
  isPlaying: false,
  isBuffering: false,
  url: ``,
  setPodcastState: () => {},
  setPlaying: () => {},
  setBuffering: () => {},
})

export const PodcastProvider = ({ children }) => {
  const [state, setPodcastState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    { isPlaying: false, isBuffering: false, url: '' },
  )
  const setPlaying = useCallback((isPlaying) => setPodcastState({ isPlaying }))
  const setBuffering = useCallback((isBuffering) =>
    setPodcastState({ isBuffering }),
  )

  return (
    <PodcastContext.Provider
      value={{ ...state, setBuffering, setPlaying, setPodcastState }}
    >
      {children}
    </PodcastContext.Provider>
  )
}

PodcastProvider.propTypes = {
  children: node.isRequired,
}

export default PodcastContext
