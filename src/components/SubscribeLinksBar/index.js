import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import Link from 'components/Link';
import { StaticQuery, graphql } from 'gatsby';
import { FaRss, FaItunes } from 'react-icons/fa';
import { SrText } from 'style/components';
import castboxLogo from 'assets/castbox.png';
import itunesLogo from 'assets/itunes.png';
import pocketCastsLogo from 'assets/pocket-casts.png';
import { Bar, Links, Title } from './styled';
import PocketCasts from './PocketCasts';

class SubscribeLinksBar extends PureComponent {
  static propTypes = {
    siteUrl: string.isRequired,
  };

  state = {};

  render() {
    const { siteUrl } = this.props;

    return (
      <Bar>
        <Title>Subscribe</Title>
        <Links>
          <Link
            to="https://itunes.apple.com/gb/podcast/white-market-podcast/id1033024096"
            title="Subscribe in iTunes"
          >
            <img
              src={itunesLogo}
              alt="iTunes logo"
              title="Subscribe in iTunes"
            />
            {/* <FaItunes /> */}
            <SrText>Subscribe in iTunes</SrText>
          </Link>
          <Link to="https://castbox.fm/channel/White-Market-Podcast-id242607">
            <img
              src={castboxLogo}
              alt="Castbox logo"
              title="Subscribe in Castbox"
            />
            <SrText>Subscribe in Castbox</SrText>
          </Link>
          <Link to="https://pca.st/wfkj">
            <img
              src={pocketCastsLogo}
              alt="Pocket Casts logo"
              title="Subscribe in Pocket Casts"
            />
            <SrText>Subscribe in Pocket Casts</SrText>
          </Link>
          <Link to={`${siteUrl}/rss.xml`} title="Get the RSS feed" download>
            <FaRss />
            <SrText>Get the RSS feed</SrText>
          </Link>
        </Links>
      </Bar>
    );
  }
}

const query = graphql`
  query SubscribeLinksBarQuery {
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
    render={({ site }) => (
      <SubscribeLinksBar siteUrl={site.siteMetadata.siteUrl} />
    )}
  />
);
