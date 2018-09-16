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
  BlogContent,
  TagList,
  TagContainer,
} from 'styles/components/blogPostPage';

export class BlogPostTemplate extends Component {
  static propTypes = {
    content: node.isRequired,
    contentComponent: func,
    description: string,
    image: string,
    imageURL: string,
    title: string.isRequired,
    helmet: instanceOf(Helmet),
    tags: array,
  };

  static defaultProps = {
    contentComponent: undefined,
    tags: [],
    helmet: null,
    description: '',
    image: '',
    imageURL: '',
  };

  state = {};

  renderTags() {
    const { tags } = this.props;

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

  render() {
    const {
      content,
      contentComponent,
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
          <p>{description}</p>
        </Hero>

        <BlogContent>
          <PostContent content={content} />
        </BlogContent>
        {this.renderTags()}
      </section>
    );
  }
}

const BlogPost = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <BlogPostTemplate
        content={html}
        contentComponent={HTMLContent}
        helmet={<Helmet title={`${frontmatter.title} | Blog`} />}
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
      }
    }
  }
`;
