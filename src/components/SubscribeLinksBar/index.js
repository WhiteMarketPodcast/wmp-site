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
          {links.left.map(({ Icon, provider, src, url, style = {} }) => (
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
          ))}

          <Link
            to={`${siteUrl}/rss.xml`}
            style={{ color: '#f26522' }}
            title="Get the RSS feed"
            download
          >
            <FaRss />
            <SrText>Get the RSS feed</SrText>
          </Link>

          {links.right.map(({ Icon, provider, src, url, style = {} }) => (
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
          ))}
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
