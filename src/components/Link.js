import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { func, node, string } from 'prop-types'

import ExternalLink from 'components/ExternalLink'

function Link(props) {
  const { to, href, onClick, children, ...others } = props
  const url = to || href

  if (!url && !onClick) {
    console.error(`Link error | props:`, props)
  }

  if (/^(https?|mailto):/.test(url)) {
    return (
      <ExternalLink {...others} href={url}>
        {children}
      </ExternalLink>
    )
  }

  return (
    <GatsbyLink {...others} to={url}>
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  onClick: func,
  href: string,
  to: string,
  children: node.isRequired,
}

Link.defaultProps = {
  onClick: undefined,
  href: '',
  to: '',
}

export default Link
