import React, { Component } from 'react';
import { string } from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Link from 'components/Link';
import {
  StyledFooter,
  LicenceInfo,
  CopyrightRow,
  CCIcon,
  CCIconContainer,
  SocialIcon,
  SocialIconContainer,
  SocialLink,
  PrivacyLink,
} from './styled';

class Footer extends Component {
  static propTypes = { siteUrl: string.isRequired };

  render() {
    const { siteUrl } = this.props;

    return (
      <StyledFooter>
        <LicenceInfo>
          <div>
            <CCIconContainer>
              <CCIcon className="fab fa-creative-commons" />
              <CCIcon className="fab fa-creative-commons-by" />
              <CCIcon className="fab fa-creative-commons-sa" />
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
              <SocialIcon className="fas fa-envelope" />
            </SocialLink>

            <SocialLink className="rss" to={`${siteUrl}/rss.xml`}>
              <SocialIcon className="fas fa-rss" />
            </SocialLink>

            <SocialLink
              className="facebook"
              to="https://www.facebook.com/whitemarketpodcast"
            >
              <SocialIcon className="fab fa-facebook" />
            </SocialLink>

            <SocialLink
              className="twitter"
              to="https://twitter.com/WhiteMarketCast"
            >
              <SocialIcon className="fab fa-twitter" />
            </SocialLink>

            <SocialLink
              className="mixcloud"
              to="https://www.mixcloud.com/whitemarketpodcast/"
            >
              <SocialIcon className="fab fa-mixcloud" />
            </SocialLink>

            <SocialLink
              className="itunes"
              to="https://itunes.apple.com/gb/podcast/white-market-podcast/id1033024096"
            >
              <SocialIcon className="fab fa-itunes" />
            </SocialLink>

            <SocialLink
              className="github"
              to="https://github.com/WhiteMarketPodcast/whitemarketpodcast-repo"
            >
              <SocialIcon className="fab fa-github" />
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
