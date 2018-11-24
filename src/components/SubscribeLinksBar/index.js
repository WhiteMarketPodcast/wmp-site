import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import Link from 'components/Link';
import { StaticQuery, graphql } from 'gatsby';
import { FaRss } from 'react-icons/fa';
import { SrText } from 'style/components';
import { links } from './constants';
import { Bar, Links, Title } from './styled';

class SubscribeLinksBar extends PureComponent {
  static propTypes = {
    siteUrl: string.isRequired,
  };

  state = {};

  render() {
    const { siteUrl } = this.props;

    return (
      <Bar>
        <Title>Ways to listen</Title>
        <Links>
          {links.map(({ provider, src, url }) => (
            <Link key={provider} to={url} title={`Subscribe in ${provider}`}>
              <img
                src={src}
                alt={`${provider} logo`}
                title={`Subscribe in ${provider}`}
              />
              <SrText>{`Subscribe in ${provider}`}</SrText>
            </Link>
          ))}

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
