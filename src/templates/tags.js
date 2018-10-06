import React from 'react';
import { object } from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import BlogGrid from 'components/BlogGrid';
import { FlexCenterWithMargin, LinkButton, BrandH1 } from 'style/components';

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

    return (
      <Layout>
        <section>
          <Helmet title={`${tag} | ${siteMetadata.title}`} />
          <BrandH1>{tagHeader}</BrandH1>
          <BlogGrid posts={posts} />
          <FlexCenterWithMargin>
            <LinkButton to="/tags/">Browse all tags</LinkButton>
          </FlexCenterWithMargin>
        </section>
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
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            image
            imageURL
            date(formatString: "DD MMMM YYYY")
            image
            imageURL
            imageAlt
            format
          }
        }
      }
    }
  }
`;
