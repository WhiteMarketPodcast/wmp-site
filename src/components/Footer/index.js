import React, { Component } from 'react';
import { string } from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import {
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaRss,
  FaMixcloud,
  FaPodcast,
  FaGithub,
  FaCreativeCommons,
  FaCreativeCommonsBy,
  FaCreativeCommonsSa,
  FaSpotify,
} from 'react-icons/fa';
import Link from 'components/Link';
import { SrText } from 'style/components';
import {
  StyledFooter,
  LicenceInfo,
  CopyrightRow,
  CCIcon,
  CCIconContainer,
  SocialIconContainer,
  SocialLink,
  PrivacyLink,
} from './styled';
import {
  emailScreenReaderText,
  rssScreenReaderText,
  facebookScreenReaderText,
  twitterScreenReaderText,
  mixcloudScreenReaderText,
  itunesScreenReaderText,
  githubScreenReaderText,
  spotifyScreenReaderText,
} from './utils';

class Footer extends Component {
  static propTypes = { siteUrl: string.isRequired };

  render() {
    const { siteUrl } = this.props;

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
              Unless otherwise noted, this blog is published under a
              {' '}
              <Link to="https://creativecommons.org/licenses/by-sa/4.0/">
                Creative Commons Attribution-ShareAlike 4.0 International
                License
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
              <span>White Market Podcast – </span>
              <Link to="https://creativecommons.org/licenses/by-sa/4.0/">
                CC BY-SA
              </Link>
            </div>
            <PrivacyLink to="/privacy-policy">Privacy</PrivacyLink>
          </div>
          <SocialIconContainer>
            <SocialLink
              className="email"
              to="mailto:whitemarketpodcast@gmail.com"
            >
              <FaEnvelope size="1.4em" />
              <SrText>{emailScreenReaderText}</SrText>
            </SocialLink>

            <SocialLink className="rss" to={`${siteUrl}/rss.xml`}>
              <FaRss size="1.4em" />
              <SrText>{rssScreenReaderText}</SrText>
            </SocialLink>

            <SocialLink
              className="facebook"
              to="https://www.facebook.com/whitemarketpodcast"
            >
              <FaFacebook size="1.4em" />
              <SrText>{facebookScreenReaderText}</SrText>
            </SocialLink>

            <SocialLink
              className="twitter"
              to="https://twitter.com/WhiteMarketCast"
            >
              <FaTwitter size="1.4em" />
              <SrText>{twitterScreenReaderText}</SrText>
            </SocialLink>

            <SocialLink
              className="spotify"
              to="https://open.spotify.com/show/4o2iPfNaRrP73gWsmQ7yF3?si=CoK9hmBnQHSb1MQVuluNcQ"
            >
              <FaSpotify size="1.4em" />
              <SrText>{spotifyScreenReaderText}</SrText>
            </SocialLink>

            <SocialLink
              className="itunes"
              to="https://itunes.apple.com/gb/podcast/white-market-podcast/id1033024096"
            >
              <FaPodcast size="1.4em" />
              <SrText>{itunesScreenReaderText}</SrText>
            </SocialLink>

            <SocialLink
              className="mixcloud"
              to="https://www.mixcloud.com/whitemarketpodcast/"
            >
              <FaMixcloud size="1.7em" />
              <SrText>{mixcloudScreenReaderText}</SrText>
            </SocialLink>

            <SocialLink
              className="github"
              to="https://github.com/WhiteMarketPodcast/whitemarketpodcast-repo"
            >
              <FaGithub size="1.4em" />
              <SrText>{githubScreenReaderText}</SrText>
            </SocialLink>
          </SocialIconContainer>
        </CopyrightRow>
      </StyledFooter>
    );
  }
}

const query = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default () => (
  <StaticQuery
    query={query}
    render={({ site }) => <Footer siteUrl={site.siteMetadata.siteUrl} />}
  />
);
