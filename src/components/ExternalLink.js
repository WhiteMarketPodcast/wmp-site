import React from 'react'
import { node, string } from 'prop-types'

const ExternalLink = ({ href, children, ...otherProps }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...otherProps}>
    {children}
  </a>
)

ExternalLink.propTypes = {
  href: string.isRequired,
  children: node.isRequired,
}

export default ExternalLink
