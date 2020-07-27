import React, { Reducer, useCallback, useReducer } from 'react'
import { node } from 'prop-types'

type PodcastState = {
  isPlaying: boolean
  isBuffering: boolean
  url: string
}

type PodcastStateSetters = {
  setPodcastState: (state: Partial<PodcastState>) => void
  setPlaying: (isPlaying: PodcastState['isPlaying']) => void
  setBuffering: (isBuffering: PodcastState['isBuffering']) => void
}

type Context = PodcastState & PodcastStateSetters

const PodcastContext = React.createContext<Context>({
  isPlaying: false,
  isBuffering: false,
  url: ``,
  setPodcastState: () => {},
  setPlaying: () => {},
  setBuffering: () => {},
})

type PodcastReducer = Reducer<PodcastState, Partial<PodcastState>>

export const PodcastProvider: React.FC = ({ children }) => {
  const [state, setPodcastState] = useReducer<PodcastReducer>(
    (oldState, newState) => ({ ...oldState, ...newState }),
    { isPlaying: false, isBuffering: false, url: '' },
  )

  const setPlaying = useCallback(
    (isPlaying) => setPodcastState({ isPlaying }),
    [],
  )

  const setBuffering = useCallback(
    (isBuffering) => setPodcastState({ isBuffering }),
    [],
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
