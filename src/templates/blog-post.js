import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { array, func, node, string, shape, object } from 'prop-types';
import { PoseGroup } from 'react-pose';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import PlayButton from 'components/PlayButton';
import Player from 'components/Player';
import Content, { HTMLContent } from 'components/Content';
import {
  Hero,
  Title,
  Column,
  BlogContent,
  Date,
  TagList,
  Sidebar,
  BlogPostLink,
  TagLink,
  VideoPlyrContainer,
  AudioPlyrContainer,
} from 'style/components/blogPostPage';

export class BlogPostTemplate extends Component {
  static propTypes = {
    content: node.isRequired,
    contentComponent: func,
    description: string,
    format: string.isRequired,
    image: string,
    // imageAlt: string,
    imageURL: string,
    // imageCredit: string,
    podcastURL: string,
    videoURL: string,
    date: string.isRequired,
    title: string.isRequired,
    helmet: node,
    pageContext: object.isRequired,
    tags: array,
  };

  static defaultProps = {
    contentComponent: undefined,
    tags: [],
    helmet: null,
    description: '',
    image: '',
    // imageAlt: '',
    // imageCredit: '',
    imageURL: '',
    podcastURL: '',
    videoURL: '',
  };

  state = {
    showMedia: false,
    isPlaying: false,
  };

  getMediaURL = () => {
    const { podcastURL, videoURL } = this.props;
    return podcastURL || videoURL;
  };

  handlePlayClick = () => {
    const { showMedia } = this.state;

    if (!showMedia) {
      this.setState({ showMedia: true, isPlaying: true });
    }

    const playButton = document.querySelector(`button.plyr__control`);
    if (!playButton) return;
    playButton.click();
  };

  renderTags() {
    const { tags } = this.props;
    if (_.isEmpty(tags)) return null;

    const tagList = _.map(tags, (tag) => (
      <li key={`${tag}tag`}>
        <TagLink to={`/tags/${_.kebabCase(tag)}/`}>{tag}</TagLink>
      </li>
    ));

    return (
      <Fragment>
        <h4>Tags</h4>
        <TagList>{tagList}</TagList>
      </Fragment>
    );
  }

  renderSidebar() {
    return (
      <Sidebar>
        {this.renderTags()}
        {this.renderNextAndPreviousButtons()}
      </Sidebar>
    );
  }

  renderNextAndPreviousButtons() {
    const { pageContext } = this.props;
    if (!pageContext) return null;

    const { nextPost, previousPost } = pageContext;

    return _.map([previousPost, nextPost], (post, index) => {
      if (_.isEmpty(post)) return null;
      const { title } = post.frontmatter;
      const { slug } = post.fields;
      return (
        <div key={slug}>
          <h4>{index ? `Previous post` : `Next post`}</h4>
          <BlogPostLink to={slug}>{title}</BlogPostLink>
        </div>
      );
    });
  }

  renderMedia() {
    const { format, image, imageURL } = this.props;
    const { showMedia } = this.state;
    const url = this.getMediaURL();
    if (!_.includes([`audio`, `video`], format) || !url) return null;
    const PlyrContainer = format === `video` ? VideoPlyrContainer : AudioPlyrContainer;

    return (
      <PoseGroup>
        {showMedia && (
          <PlyrContainer className={format} key={url} bgImage={image || imageURL}>
            <Player
              url={url}
              type={format}
              onPlay={() => this.setState({ isPlaying: true })}
              onPause={() => this.setState({ isPlaying: false })}
              autoplay
            />
          </PlyrContainer>
        )}
      </PoseGroup>
    );
  }

  renderTitle() {
    const { format, image, imageURL, title, description, date } = this.props;
    const { showMedia } = this.state;
    if (showMedia && format === `video`) return null;

    return (
      <Hero src={image || imageURL}>
        <Title>{title}</Title>
        {description && <p>{description}</p>}
        {this.renderPlayButton()}
        <Date>{date}</Date>
      </Hero>
    );
  }

  renderPlayButton() {
    const url = this.getMediaURL();
    const { isPlaying } = this.state;
    if (!url) return null;

    return <PlayButton onClick={this.handlePlayClick} isPlaying={isPlaying} />;
  }

  render() {
    const { content, contentComponent, helmet } = this.props;
    const PostContent = contentComponent || Content;

    return (
      <section>
        {helmet}
        {this.renderTitle()}
        <Column>
          <div>
            {this.renderMedia()}
            <BlogContent>
              <PostContent content={content} />
            </BlogContent>
          </div>
          {this.renderSidebar()}
        </Column>
      </section>
    );
  }
}

const BlogPost = ({ data, pageContext }) => {
  const { html, frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <BlogPostTemplate
        content={html}
        contentComponent={HTMLContent}
        helmet={<Helmet title={`${frontmatter.title} | Blog`} />}
        pageContext={pageContext}
        {...frontmatter}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: shape({
    markdownRemark: object,
  }).isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        title
        description
        image
        imageURL
        imageAlt
        format
        tags
        podcastURL
        videoURL
      }
    }
  }
`;
