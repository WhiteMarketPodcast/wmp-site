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
import { FacebookHelmet, TwitterHelmet } from 'components/Helmets';
import {
  Hero,
  Title,
  Column,
  BlogContent,
  Date,
  TagList,
  Sidebar,
  BlogPostLink,
  BlogPostLinksContainer,
  TagLink,
  VideoPlyrContainer,
  AudioPlyrContainer,
  ShareLink,
  ShareLinksContainer,
} from 'style/components/blogPostPage';
import { getShareURLs } from 'utils/sharing';

export class BlogPostTemplate extends Component {
  static propTypes = {
    content: node.isRequired,
    contentComponent: func,
    description: string,
    format: string.isRequired,
    image: string,
    imageAlt: string,
    imageURL: string,
    // imageCredit: string,
    podcastURL: string,
    videoURL: string,
    date: string.isRequired,
    title: string.isRequired,
    siteUrl: string.isRequired,
    slug: string.isRequired,
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
    imageAlt: '',
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

  renderShareLinks() {
    const { title, slug, siteUrl } = this.props;

    const { facebookURL, twitterURL, whatsAppURL, mailto } = getShareURLs({
      url: `${siteUrl}${slug}`,
      text: title,
    });

    return (
      <Fragment>
        <h4>Share</h4>
        <ShareLinksContainer>
          <ShareLink to={twitterURL}>
            <i className="fab fa-twitter" />
          </ShareLink>
          <ShareLink to={facebookURL}>
            <i className="fab fa-facebook" />
          </ShareLink>
          <ShareLink to={whatsAppURL}>
            <i className="fab fa-whatsapp" />
          </ShareLink>
          <ShareLink to={mailto}>
            <i className="fas fa-envelope" />
          </ShareLink>
        </ShareLinksContainer>
      </Fragment>
    );
  }

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
        {this.renderShareLinks()}
        {this.renderLinksToOtherPosts()}
      </Sidebar>
    );
  }

  renderLinksToOtherPosts() {
    const { pageContext } = this.props;
    if (!pageContext) return null;

    const { nextPost, previousPost } = pageContext;

    const links = _.map([previousPost, nextPost], (post) => {
      if (_.isEmpty(post)) return null;
      const { title } = post.frontmatter;
      const { slug } = post.fields;
      return (
        <li key={slug}>
          <BlogPostLink to={slug}>
            <i className="fas fa-caret-right" />
            {title}
          </BlogPostLink>
        </li>
      );
    });

    return (
      <div>
        <h4>More from the blog</h4>
        <BlogPostLinksContainer>{links}</BlogPostLinksContainer>
      </div>
    );
  }

  renderHelmet() {
    const {
      helmet,
      title,
      description,
      image,
      imageURL,
      imageAlt,
      siteUrl,
      slug,
    } = this.props;
    const imageSrc = image || imageURL;
    const commonMetaTags = { title, description, image: imageSrc };

    if (!helmet) return null;

    return (
      <Fragment>
        {helmet}
        <FacebookHelmet
          {...commonMetaTags}
          url={`${siteUrl}${slug}`}
        />
        <TwitterHelmet
          {...commonMetaTags}
          imageAlt={imageAlt}
          cardType="summary_large_image"
        />
      </Fragment>
    );
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
          <PlyrContainer
            className={format}
            key={url}
            bgImage={image || imageURL}
          >
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
    const { content, contentComponent } = this.props;
    const PostContent = contentComponent || Content;

    return (
      <section>
        {this.renderHelmet()}
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
  const {
    site: {
      siteMetadata: { siteUrl, title },
    },
    markdownRemark: {
      html,
      frontmatter,
      fields: { slug },
    },
  } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={html}
        contentComponent={HTMLContent}
        helmet={<Helmet title={`${frontmatter.title} | ${title} Blog`} />}
        pageContext={pageContext}
        siteUrl={siteUrl}
        slug={slug}
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
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
