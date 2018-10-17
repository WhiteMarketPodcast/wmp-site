import React, { Component, Fragment } from 'react';
import { node, string } from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import Helmet from 'react-helmet';
import { PoseGroup } from 'react-pose';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FacebookHelmet, TwitterHelmet } from 'components/Helmets';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import 'style/sass/all.sass';
import 'style';
import { PageFade } from './styled';

library.add(fas, far, fab);
// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch();

class TemplateWrapper extends Component {
  static propTypes = {
    children: node.isRequired,
    description: string.isRequired,
    siteLogo: string.isRequired,
    siteUrl: string.isRequired,
    subtitle: string.isRequired,
    title: string.isRequired,
  };

  render() {
    const {
      children,
      title,
      subtitle,
      description,
      siteLogo,
      siteUrl,
    } = this.props;
    const helmetProps = {
      title,
      description,
      image: siteLogo,
      url: siteUrl,
      type: `website`,
    };

    return (
      <Fragment>
        <Helmet>
          <title>{`${title} | ${subtitle}"`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <FacebookHelmet {...helmetProps} />
        <TwitterHelmet {...helmetProps} />

        <Navbar />
        <Location>
          {({ location }) => (
            <PoseGroup animateOnMount preEnterPose="initial">
              <PageFade key={location.key}>
                <main>{children}</main>
              </PageFade>
            </PoseGroup>
          )}
        </Location>
        <Footer />
      </Fragment>
    );
  }
}

const query = graphql`
  query LayoutQuery {
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
`;

export default (props) => (
  <StaticQuery
    query={query}
    render={({ site }) => <TemplateWrapper {...site.siteMetadata} {...props} />}
  />
);
