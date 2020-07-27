import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'
import { string } from 'prop-types'

import FacebookHelmet from './FacebookHelmet'
import TwitterHelmet from './TwitterHelmet'

class TopLevelHelmet extends PureComponent {
  static propTypes = {
    description: string.isRequired,
    siteLogo: string.isRequired,
    siteUrl: string.isRequired,
    subtitle: string.isRequired,
    title: string.isRequired,
  }

  render() {
    const { title, subtitle, description, siteLogo, siteUrl } = this.props

    const helmetProps = {
      title,
      description,
      image: siteLogo,
      url: siteUrl,
      type: `website`,
    }

    return (
      <>
        <Helmet>
          <html lang="en" />
          <title>{`${title} | ${subtitle}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <FacebookHelmet {...helmetProps} />
        <TwitterHelmet {...helmetProps} />
      </>
    )
  }
}

const query = graphql`
  query TopLevelHelmet {
    site {
      siteMetadata {
        title
        subtitle
        description
        siteLogo
        siteUrl
      }
    }
  }
`

export default (props) => (
  <StaticQuery
    query={query}
    render={({ site }) => <TopLevelHelmet {...site.siteMetadata} {...props} />}
  />
)
