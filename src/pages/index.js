import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Layout from 'components/Layout';
import Player from 'components/Player';
import {
  BlogPostPreviewGrid,
  BlogPreviewContainer,
  PreviewTitle,
  BlogPreviewImage,
  PreviewTextContainer,
  PostType,
  DateText,
  FlexCenter,
  FlexCenterWithMargin,
  LinkButton,
  PodcastSection,
  PodcastTextContainer,
  PodcastSmallText,
  PodcastTitle,
  BrandH2,
} from 'style/components';

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
    const { slug } = podcast.fields;
    const { title, podcastURL, image, imageURL } = podcast.frontmatter;

    return (
      <PodcastSection bgImage={image || imageURL}>
        <PodcastTextContainer>
          <PodcastSmallText>Latest session</PodcastSmallText>
          <Link to={slug}>
            <PodcastTitle>{title}</PodcastTitle>
          </Link>
        </PodcastTextContainer>
        <Player url={podcastURL} />
      </PodcastSection>
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
          <PostType format={format}>{formatConverter[format]}</PostType>
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
      <section>
        <FlexCenter>
          <BrandH2>Latest Posts</BrandH2>
        </FlexCenter>

        <BlogPostPreviewGrid>
          {_.map(posts, this.renderPost)}
        </BlogPostPreviewGrid>

        <FlexCenterWithMargin>
          <LinkButton to="/blog/">See more posts</LinkButton>
        </FlexCenterWithMargin>
      </section>
    );
  }

  render() {
    return (
      <Layout>
        {this.renderPodcast()}
        {this.renderPosts()}
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
