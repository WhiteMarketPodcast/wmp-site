/* eslint-disable react/prop-types */
import React from 'react'

import Layout from './src/components/Layout'
import { PodcastProvider } from './src/contexts/PodcastContext'
import { delay } from './src/style/poses'

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

export const wrapRootElement = ({ element }) => (
  <PodcastProvider>{element}</PodcastProvider>
)

export const shouldUpdateScroll = () => {
  window.setTimeout(() => window.scrollTo(0, 0), delay)
  return false
}
