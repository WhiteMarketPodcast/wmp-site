import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import {
  BlogPostPreviewGrid,
  BlogPreviewContainer,
  PreviewTitle,
  BlogPreviewImage,
  PreviewTextContainer,
  BlogType,
} from 'styles/components';

const formatConverter = {
  standard: `blog`,
  audio: `podcast`,
  video: `video`,
};

export default class IndexPage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }).isRequired,
  };

  renderPosts() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return _.map(posts, ({ node: post }, index) => {
      const {
        id,
        frontmatter: {
          image,
          imageURL,
          // imageAlt,
          title,
          // date,
          format,
        },
        fields: { slug },
        // excerpt,
      } = post;
      return (
        <BlogPreviewContainer key={id} to={slug}>
          <BlogPreviewImage bgImage={image || imageURL} index={index} />
          <PreviewTextContainer index={index}>
            <BlogType>{formatConverter[format]}</BlogType>
            <PreviewTitle index={index}>{title}</PreviewTitle>
          </PreviewTextContainer>
        </BlogPreviewContainer>
      );
    });
  }

  render() {
    return (
      <Layout>
        <BlogPostPreviewGrid>{this.renderPosts()}</BlogPostPreviewGrid>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 8
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
            templateKey
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
