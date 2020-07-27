import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'
import { bool, string } from 'prop-types'

import FacebookHelmet from './FacebookHelmet'
import TwitterHelmet from './TwitterHelmet'

class PageHelmet extends PureComponent {
  static propTypes = {
    // Props passed directly
    pageTitle: string.isRequired,
    path: string.isRequired,
    description: string,
    largeTwitterCard: bool,
    image: string,
    imageAlt: string,
    type: string,

    // GraphQL props
    siteName: string.isRequired,
    siteUrl: string.isRequired,
    siteLogo: string.isRequired,
  }

  static defaultProps = {
    description: ``,
    image: ``,
    imageAlt: ``,
    largeTwitterCard: false,
    type: `article`,
  }

  render() {
    const {
      description,
      image,
      imageAlt,
      largeTwitterCard,
      pageTitle,
      path,
      siteLogo,
      siteName,
      siteUrl,
      type,
    } = this.props
    const title = `${pageTitle} | ${siteName}`
    const url = `${siteUrl}${path}`

    const helmetProps = {
      title,
      description,
      image: image || siteLogo,
      imageAlt,
      url,
      type,
      cardType: largeTwitterCard ? `summary_large_image` : `summary`,
    }

    return (
      <>
        <Helmet>
          <title>{title}</title>
          {description && <meta name="description" content={description} />}
        </Helmet>
        <FacebookHelmet {...helmetProps} />
        <TwitterHelmet {...helmetProps} />
      </>
    )
  }
}

const query = graphql`
  query PageHelmet {
    site {
      siteMetadata {
        siteName: title
        siteLogo
        siteUrl
      }
    }
  }
`

export default (props) => (
  <StaticQuery
    query={query}
    render={({ site }) => <PageHelmet {...site.siteMetadata} {...props} />}
  />
)
