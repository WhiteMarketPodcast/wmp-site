import React from 'react';
import { object } from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from 'components/Layout';
import { PaddedSection } from 'style/components';

class TagRoute extends React.Component {
  static propTypes = {
    data: object.isRequired,
    pageContext: object.isRequired,
  };

  render() {
    const {
      data: {
        allMarkdownRemark: { edges: posts, totalCount },
        site: { siteMetadata },
      },
      pageContext: { tag },
    } = this.props;

    const tagHeader = `Posts tagged with “${tag}”: ${totalCount}`;
    const postLinks = posts.map(({ node: post }) => {
      const {
        fields: { slug },
        frontmatter: { title },
      } = post;

      return (
        <li key={slug}>
          <Link to={slug}>
            <h2 className="is-size-2">{title}</h2>
          </Link>
        </li>
      );
    });

    return (
      <Layout>
        <PaddedSection>
          <Helmet title={`${tag} | ${siteMetadata.title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <p>
                  <Link to="/tags/">Browse all tags</Link>
                </p>
              </div>
            </div>
          </div>
        </PaddedSection>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
