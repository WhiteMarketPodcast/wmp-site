import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import BlogGrid from 'components/BlogGrid';
import Layout from 'components/Layout';
import { BrandH1 } from 'style/components';

export default class BlogList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }).isRequired,
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <BrandH1>Blog Posts</BrandH1>
        <BlogGrid posts={posts} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
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
