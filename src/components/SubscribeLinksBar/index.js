import React from 'react'
import { FaMixcloud, FaPodcast, FaRss, FaSpotify } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

import castboxLogo from 'assets/castbox.png'
import googlePodcastsLogo from 'assets/google-podcasts-logo.png'
import pocketCastsLogo from 'assets/pocket-casts.png'
import Link from 'components/Link'
import { SrText } from 'style/components'

import { Bar, Links, Title } from './styled'

const SubscribeLinksBar = () => {
  const data = useStaticQuery(graphql`
    query SubscribeLinksBarQuery {
      site {
        siteMetadata {
          siteUrl
          links {
            castbox
            googlePodcasts
            itunes
            mixcloud
            pocketCasts
            spotify
          }
        }
      }
    }
  `)

  const {
    siteUrl,
    links: { castbox, googlePodcasts, itunes, mixcloud, pocketCasts, spotify },
  } = data.site.siteMetadata

  const links = [
    {
      provider: `Castbox`,
      src: castboxLogo,
      url: castbox,
    },
    {
      provider: `Google Podcasts`,
      src: googlePodcastsLogo,
      url: googlePodcasts,
    },
    {
      Icon: FaPodcast,
      provider: `Apple Podcasts`,
      url: itunes,
      style: { color: '#de50ed' },
    },
    {
      Icon: FaSpotify,
      provider: `Spotify`,
      url: spotify,
      style: { color: '#1db954' },
    },
    {
      provider: `Pocket Casts`,
      src: pocketCastsLogo,
      url: pocketCasts,
    },
    {
      Icon: FaMixcloud,
      provider: `Mixcloud`,
      url: mixcloud,
      style: { color: '#4fa6d3' },
    },
  ]
    .filter(({ url }) => url)
    .map(({ Icon, provider, src, url, style = {} }) => (
      <Link
        key={provider}
        to={url}
        title={`Subscribe on ${provider}`}
        style={style}
      >
        {Icon ? (
          <Icon />
        ) : (
          <img
            src={src}
            alt={`${provider} logo`}
            title={`Subscribe on ${provider}`}
          />
        )}
        <SrText>{`Subscribe on ${provider}`}</SrText>
      </Link>
    ))

  links.splice(
    Math.floor(links.length / 2),
    0,
    <Link
      key="rss-feed"
      to={`${siteUrl}/rss.xml`}
      style={{ color: '#f26522' }}
      title="Get the RSS feed"
      download
    >
      <FaRss />
      <SrText>Get the RSS feed</SrText>
    </Link>,
  )

  return (
    <Bar>
      <Title>Ways to listen</Title>
      <Links>{links}</Links>
    </Bar>
  )
}

export default SubscribeLinksBar
