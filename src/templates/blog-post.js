import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { array, func, node, string, shape, object } from 'prop-types';
import { PoseGroup } from 'react-pose';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import PlayButton from 'components/PlayButton';
import Player from 'components/Player';
import Content, { HTMLContent } from 'components/Content';
import { SrText } from 'style/components';
import { FacebookHelmet, TwitterHelmet } from 'components/Helmets';
import {
  Hero,
  Title,
  Column,
  BlogContent,
  ImageCredit,
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
  Fade,
  CenteredFade,
} from 'style/components/blogPostPage';
import { licenceURLs } from 'utils';
import { getShareURLs } from 'utils/sharing';

function renderImageInfoSpan(text, name, url) {
  return (
    <span>
      {text}
      {url ? <Link to={url}>{name}</Link> : name}
    </span>
  );
}

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
            <SrText>Share this post on Twitter</SrText>
          </ShareLink>
          <ShareLink to={facebookURL}>
            <i className="fab fa-facebook" />
            <SrText>Share this post on Facebook</SrText>
          </ShareLink>
          <ShareLink to={whatsAppURL}>
            <i className="fab fa-whatsapp" />
            <SrText>Share this post on WhatsApp</SrText>
          </ShareLink>
          <ShareLink to={mailto}>
            <i className="fas fa-envelope" />
            <SrText>Email someone a link to this post</SrText>
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
        {this.renderShareLinks()}
        {this.renderTags()}
        {this.renderLinksToOtherPosts()}
      </Sidebar>
    );
  }

  renderLinksToOtherPosts() {
    const { pageContext } = this.props;
    if (!pageContext) return null;

    const { otherPosts } = pageContext;

    const links = _.map(otherPosts, (post) => {
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
        {description && (
          <Helmet>
            <meta name="description" content={description} />
          </Helmet>
        )}
        <FacebookHelmet {...commonMetaTags} url={`${siteUrl}${slug}`} />
        <TwitterHelmet
          {...commonMetaTags}
          imageAlt={imageAlt}
          cardType="summary_large_image"
        />
      </Fragment>
    );
  }

  renderImageCredit() {
    const { imageCredit } = this.props;
    if (!_.isObject(imageCredit)) return null;
    const { author, licence } = imageCredit;
    const { name, url, site, siteURL } = author || {};
    const licenceURL = licence && licenceURLs[licence];

    const photoBy = renderImageInfoSpan(`Photo by `, name, url);
    const where = site && renderImageInfoSpan(` on `, site, siteURL);
    const licenceInfo = licence && renderImageInfoSpan(` – `, licence, licenceURL);

    return (
      <ImageCredit>
        {photoBy}
        {where}
        {licenceInfo}
      </ImageCredit>
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
    const { format, image, imageURL, title, date } = this.props;
    const { showMedia } = this.state;
    if (showMedia && format === `video`) return null;

    return (
      <Hero src={image || imageURL}>
        <CenteredFade>
          <Title>{title}</Title>
          {this.renderPlayButton()}
          <Date>{date}</Date>
        </CenteredFade>
      </Hero>
    );
  }

  renderPlayButton() {
    const url = this.getMediaURL();
    const { isPlaying } = this.state;
    const { format } = this.props;
    const srText = `Play ${format === `audio` ? `podcast` : format}`;
    if (!url) return null;

    return (
      <Fade>
        <PlayButton onClick={this.handlePlayClick} isPlaying={isPlaying} screenReaderText={srText} />
      </Fade>
    );
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
            {this.renderImageCredit()}
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
    <BlogPostTemplate
      content={html}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${frontmatter.title} | ${title}`} />}
      pageContext={pageContext}
      siteUrl={siteUrl}
      slug={slug}
      {...frontmatter}
    />
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
        imageCredit {
          author {
            name
            url
            site
            siteURL
          }
          licence
        }
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
