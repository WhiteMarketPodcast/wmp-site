import React from 'react'
import {
  FaCreativeCommons,
  FaCreativeCommonsBy,
  FaCreativeCommonsSa,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaMixcloud,
  FaPodcast,
  FaRss,
  FaSpotify,
  FaTwitter,
} from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

import { FooterQuery } from 'types/gatsby-graphql'

import Link from 'components/Link'
import { SrText } from 'style/components'

import {
  CCIcon,
  CCIconContainer,
  CopyrightRow,
  LicenceInfo,
  PrivacyLink,
  SocialIconContainer,
  SocialLink,
  StyledFooter,
} from './styled'
import { getSRTextForLinks } from './utils'

const Footer = () => {
  const data = useStaticQuery<FooterQuery>(graphql`
    query Footer {
      site {
        siteMetadata {
          siteUrl
          title
          ownerEmail
          links {
            github
            itunes
            twitter
            facebook
            mixcloud
            spotify
          }
        }
      }
    }
  `)
  const { links, ownerEmail, siteUrl, title } = data.site.siteMetadata
  const srText = getSRTextForLinks({ title, email: ownerEmail })

  return (
    <StyledFooter>
      <LicenceInfo>
        <div>
          <CCIconContainer>
            <CCIcon>
              <FaCreativeCommons />
            </CCIcon>
            <CCIcon>
              <FaCreativeCommonsBy />
            </CCIcon>
            <CCIcon>
              <FaCreativeCommonsSa />
            </CCIcon>
          </CCIconContainer>
          <div>
            Unless otherwise noted, this blog is published under a{' '}
            <Link to="https://creativecommons.org/licenses/by-sa/4.0/">
              Creative Commons Attribution-ShareAlike 4.0 International License
            </Link>
            . Individual tracks retain their original licences and may be more
            restrictive. Please refer to each original release page for more
            information.
          </div>
        </div>
      </LicenceInfo>
      <CopyrightRow>
        <div>
          <div>
            <span>{`${title} – `}</span>
            <Link to="https://creativecommons.org/licenses/by-sa/4.0/">
              CC BY-SA
            </Link>
          </div>
          <PrivacyLink to="/privacy-policy">Privacy</PrivacyLink>
        </div>
        <SocialIconContainer>
          <SocialLink className="email" to={`mailto:${ownerEmail}`}>
            <FaEnvelope size="1.4em" />
            <SrText>{srText.email}</SrText>
          </SocialLink>

          <SocialLink className="rss" to={`${siteUrl}/rss.xml`}>
            <FaRss size="1.4em" />
            <SrText>{srText.rss}</SrText>
          </SocialLink>

          {links.facebook && (
            <SocialLink className="facebook" to={links.facebook}>
              <FaFacebook size="1.4em" />
              <SrText>{srText.facebook}</SrText>
            </SocialLink>
          )}

          {links.twitter && (
            <SocialLink className="twitter" to={links.twitter}>
              <FaTwitter size="1.4em" />
              <SrText>{srText.twitter}</SrText>
            </SocialLink>
          )}

          {links.spotify && (
            <SocialLink className="spotify" to={links.spotify}>
              <FaSpotify size="1.4em" />
              <SrText>{srText.spotify}</SrText>
            </SocialLink>
          )}

          {links.itunes && (
            <SocialLink className="itunes" to={links.itunes}>
              <FaPodcast size="1.4em" />
              <SrText>{srText.itunes}</SrText>
            </SocialLink>
          )}

          {links.mixcloud && (
            <SocialLink className="mixcloud" to={links.mixcloud}>
              <FaMixcloud size="1.7em" />
              <SrText>{srText.mixcloud}</SrText>
            </SocialLink>
          )}

          {links.github && (
            <SocialLink className="github" to={links.github}>
              <FaGithub size="1.4em" />
              <SrText>{srText.github}</SrText>
            </SocialLink>
          )}
        </SocialIconContainer>
      </CopyrightRow>
    </StyledFooter>
  )
}

export default Footer
