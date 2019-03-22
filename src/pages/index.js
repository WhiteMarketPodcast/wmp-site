import _ from 'lodash';
import React, { Component } from 'react';
import { array, shape, string } from 'prop-types';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import PlayButton from 'components/PlayButton';
import SubscribeLinksBar from 'components/SubscribeLinksBar';
import PodcastContext from 'components/PodcastContext';
import {
  BlogPostPreviewGrid,
  BlogPreviewContainer,
  PreviewTitle,
  BlogPreviewImage,
  PreviewTextContainer,
  PostType,
  DateText,
  FlexCenter,
  LinkButton,
  PodcastSection,
  PodcastTextContainer,
  PodcastSmallText,
  PodcastTitle,
  BrandH2,
  PodcastPlayBox,
  SeeMoreContainer,
} from 'style/components';
import { formatConverter, isFirstPostPodcast } from 'utils';

export default class IndexPage extends Component {
  static propTypes = {
    data: shape({
      site: shape({
        siteMetadata: shape({
          title: string.isRequired,
          siteUrl: string.isRequired,
        }),
      }),
      podcast: shape({ edges: array }),
      posts: shape({ edges: array }),
    }).isRequired,
  };

  static contextType = PodcastContext;

  getPodcastInfo = () => this.props.data.podcast.edges[0].node;

  handlePlayButtonClick = () => {
    const { podcastURL } = this.getPodcastInfo().frontmatter;
    const { isPlaying, url, setPodcastState, setPlayState } = this.context;

    if (podcastURL === url) {
      setPlayState(!isPlaying);
    } else {
      setPodcastState({ url: podcastURL });
    }
  };

  renderPodcast() {
    const { isPlaying, url } = this.context;
    const { fields, frontmatter } = this.getPodcastInfo();
    const { slug } = fields;
    const { title, podcastURL, image, imageURL } = frontmatter;

    return (
      <PodcastSection bgImage={image || imageURL}>
        <PodcastPlayBox>
          <PodcastTextContainer>
            <PodcastSmallText>Latest session</PodcastSmallText>
            <Link to={slug}>
              <PodcastTitle>{title}</PodcastTitle>
            </Link>
          </PodcastTextContainer>
          <PlayButton
            isPlaying={url === podcastURL && isPlaying}
            onClick={this.handlePlayButtonClick}
            screenReaderText="Listen to the latest session"
          />
        </PodcastPlayBox>
        <SubscribeLinksBar />
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
    const { edges } = data.posts;
    const posts = isFirstPostPodcast(edges) ? _.tail(edges) : _.take(edges, 8);

    return (
      <section>
        <FlexCenter>
          <BrandH2>Latest Posts</BrandH2>
        </FlexCenter>

        <BlogPostPreviewGrid>
          {_.map(posts, this.renderPost)}
        </BlogPostPreviewGrid>

        <SeeMoreContainer>
          <LinkButton to="/blog/">See more posts</LinkButton>
        </SeeMoreContainer>
      </section>
    );
  }

  render() {
    const { data } = this.props;
    const { title, subtitle, siteUrl } = data.site.siteMetadata;

    return (
      <>
        <Helmet>
          <title>{`${title} | ${subtitle}`}</title>
          <link
            type="application/rss+xml"
            rel="alternate"
            title={title}
            href={`${siteUrl}/rss.xml`}
          />
        </Helmet>
        {this.renderPodcast()}
        {this.renderPosts()}
      </>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        siteUrl
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 9
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
