import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { TwitterHelmetQuery } from 'types/gatsby-graphql'

type TwitterHelmetProps = {
  siteUrl: string
  title: string
  description?: string
  image: string
  imageAlt?: string
  cardType?: string
}

const TwitterHelmet: React.FC<TwitterHelmetProps> = ({
  cardType,
  children,
  description,
  image,
  imageAlt,
  title,
}) => {
  const data = useStaticQuery<TwitterHelmetQuery>(graphql`
    query TwitterHelmet {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)
  const { siteUrl } = data.site.siteMetadata

  const imageURL = /^\/img\//.test(image) ? `${siteUrl}${image}` : image

  return (
    <Helmet>
      <meta name="twitter:card" content={cardType || 'summary'} />
      <meta name="twitter:site" content="@WhiteMarketCast" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={imageURL} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      {children}
    </Helmet>
  )
}

export default TwitterHelmet
