import React, { Component } from 'react';
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
} from './styled';

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <LicenceInfo>
          <div>
            <CCIconContainer>
              <CCIcon className="fab fa-creative-commons" />
              <CCIcon className="fab fa-creative-commons-by" />
              <CCIcon className="fab fa-creative-commons-nc" />
            </CCIconContainer>
            <div>
              Unless otherwise noted, this blog is published under an
              {' '}
              <Link to="https://creativecommons.org/licenses/by-nc/4.0/">
                Attribution Non-Commercial
              </Link>
              {' '}
              Creative Commons licence. Individual tracks retain their original
              licences and may be more restrictive. Please refer to each
              original release page for more information.
            </div>
          </div>
        </LicenceInfo>
        <CopyrightRow>
          <div>White Market Podcast - CC BY-NC</div>
          <SocialIconContainer>
            <SocialLink
              className="email"
              to="mailto:whitemarketpodcast@gmail.com"
            >
              <SocialIcon className="fas fa-envelope" />
            </SocialLink>

            <SocialLink className="rss" to="/still-need-to-do-this">
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

export default Footer;
