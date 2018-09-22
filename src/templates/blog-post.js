import _ from 'lodash';
import React, { Component } from 'react';
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
import Link from 'components/Link';
import Content, { HTMLContent } from 'components/Content';
import {
  Hero,
  Title,
  Column,
  BlogContent,
  Date,
  TagList,
  TagContainer,
} from 'styles/components/blogPostPage';

export class BlogPostTemplate extends Component {
  static propTypes = {
    content: node.isRequired,
    contentComponent: func,
    description: string,
    format: string.isRequired,
    image: string,
    imageAlt: string,
    imageURL: string,
    imageCredit: string,
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
    imageAlt: '',
    imageCredit: '',
    imageURL: '',
    podcastURL: '',
    videoURL: '',
  };

  state = {};

  renderTags() {
    const { tags } = this.props;
    console.log('tags', tags);

    if (_.isEmpty(tags)) return null;

    const tagList = _.map(tags, (tag) => (
      <li key={`${tag}tag`}>
        <Link to={`/tags/${_.kebabCase(tag)}/`}>{tag}</Link>
      </li>
    ));

    return (
      <TagContainer>
        <h4>Tags</h4>
        <TagList>{tagList}</TagList>
      </TagContainer>
    );
  }

  renderNextAndPreviousButtons() {
    const { nextPost, previousPost } = this.props.pageContext;
    console.log('nextPost, previousPost', nextPost, previousPost);
    return nextPost && previousPost && null;
  }

  render() {
    const {
      content,
      contentComponent,
      date,
      description,
      image,
      imageURL,
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

        <Column>
          <BlogContent>
            <PostContent content={content} />
            {this.renderNextAndPreviousButtons()}
          </BlogContent>
          {this.renderTags()}
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
      }
    }
  }
`;
