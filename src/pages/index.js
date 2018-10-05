import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import Player from 'components/Player';
import {
  BlogPostPreviewGrid,
  BlogPreviewContainer,
  PreviewTitle,
  BlogPreviewImage,
  PreviewTextContainer,
  BlogType,
  DateText,
  FlexCenterWithMargin,
  LinkButton,
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

  renderPodcast() {
    const { data } = this.props;
    const podcast = data.podcast.edges[0].node;
    console.log('podcast', podcast);
    const { podcastURL } = podcast.frontmatter;

    return (
      <FlexCenterWithMargin>
        <Player url={podcastURL} />
      </FlexCenterWithMargin>
    );
  }

  renderPost = ({ node: post }, index) => {
    const {
      id,
      frontmatter: { image, imageURL, title, date, format },
      fields: { slug },
    } = post;

    return (
      <BlogPreviewContainer key={id} to={slug}>
        <BlogPreviewImage bgImage={image || imageURL} index={index} />
        <PreviewTextContainer index={index}>
          <BlogType>{formatConverter[format]}</BlogType>
          <PreviewTitle index={index}>{title}</PreviewTitle>
          <DateText index={index}>{date}</DateText>
        </PreviewTextContainer>
      </BlogPreviewContainer>
    );
  };

  renderPosts() {
    const { data } = this.props;
    const { edges: posts } = data.posts;

    return (
      <BlogPostPreviewGrid>{_.map(posts, this.renderPost)}</BlogPostPreviewGrid>
    );
  }

  render() {
    return (
      <Layout>
        {this.renderPodcast()}
        {this.renderPosts()}
        <FlexCenterWithMargin>
          <LinkButton to="/blog/">See more posts</LinkButton>
        </FlexCenterWithMargin>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
    podcast: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
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
    podcast: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { format: { eq: "audio" } } }
      limit: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image
            imageURL
            imageAlt
            podcastURL
          }
        }
      }
    }
  }
`;
