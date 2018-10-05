import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import {
  array,
  func,
  node,
  string,
  instanceOf,
  shape,
  object,
} from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
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
    helmet: instanceOf(Helmet),
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

  state = {};

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
    const { format, podcastURL, videoURL } = this.props;
    const url = podcastURL || videoURL;
    if (!_.includes([`audio`, `video`], format) || !url) return null;

    return <Player url={url} type={format} />;
  }

  render() {
    const {
      content,
      contentComponent,
      date,
      description,
      image,
      imageURL,
      tags,
      title,
      helmet,
    } = this.props;
    const PostContent = contentComponent || Content;

    return (
      <section>
        {helmet}
        <Hero src={image || imageURL}>
          <Title>{title}</Title>
          {description && <p>{description}</p>}
          <Date>{date}</Date>
        </Hero>

        <Column className={_.isEmpty(tags) ? 'no-aside' : ''}>
          <BlogContent>
            {this.renderMedia()}
            <PostContent content={content} />
          </BlogContent>
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
