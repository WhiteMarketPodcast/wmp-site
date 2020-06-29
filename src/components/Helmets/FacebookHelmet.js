import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { node, string } from 'prop-types'

class FacebookHelmet extends PureComponent {
  static propTypes = {
    url: string.isRequired,
    type: string,
    title: string.isRequired,
    description: string,
    image: string.isRequired,
    children: node,
  }

  static defaultProps = {
    type: `article`,
    children: null,
    description: ``,
  }

  render() {
    const { children, description, image, title, type, url } = this.props

    return (
      <Helmet>
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        {description && (
          <meta property="og:description" content={description} />
        )}
        <meta property="og:image" content={image} />
        {children}
      </Helmet>
    )
  }
}

export default FacebookHelmet
