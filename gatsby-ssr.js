import React from 'react'
import Layout from './src/components/Layout'

// eslint-disable-next-line react/prop-types
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
