import React, { PureComponent } from 'react'
import { node, string } from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

class TwitterHelmet extends PureComponent {
  static propTypes = {
    siteUrl: string.isRequired,
    title: string.isRequired,
    description: string,
    image: string.isRequired,
    imageAlt: string,
    cardType: string,
    children: node,
  }

  static defaultProps = {
    cardType: `summary`,
    imageAlt: ``,
    children: null,
    description: ``,
  }

  render() {
    const {
      cardType,
      children,
      description,
      image,
      imageAlt,
      siteUrl,
      title,
    } = this.props
    const imageURL = /^\/img\//.test(image) ? `${siteUrl}${image}` : image

    return (
      <Helmet>
        <meta name="twitter:card" content={cardType} />
        <meta name="twitter:site" content="@WhiteMarketCast" />
        <meta name="twitter:title" content={title} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:image" content={imageURL} />
        {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
        {children}
      </Helmet>
    )
  }
}

const query = graphql`
  query TwitterHelmetQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default (props) => (
  <StaticQuery
    query={query}
    render={({ site }) => <TwitterHelmet {...site.siteMetadata} {...props} />}
  />
)
