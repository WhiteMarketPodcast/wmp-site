import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import { BrandH1 } from 'styles/components';
import {
  BlogListGrid,
  BlogPreviewContainer,
  PreviewTitle,
  BlogPreviewImage,
  PreviewTextContainer,
  BlogType,
  ExcerptContainer,
  DateText,
} from 'styles/components/blogListPage';

const formatConverter = {
  standard: `blog`,
  audio: `podcast`,
  video: `video`,
};

export default class BlogList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }).isRequired,
  };

  state = { numberToShow: 4, showExcerpt: null };

  clearShowExcerpt = (index) => {
    const { showExcerpt } = this.state;
    if (index !== showExcerpt) return;
    this.setState({ showExcerpt: null });
  };

  handleHover = (index) => () => {
    const { showExcerpt } = this.state;
    if (showExcerpt === index) return;
    clearTimeout(this.state.timeout);
    this.setState({ showExcerpt: index });
  };

  handleBlur = (index) => () => {
    this.setState({
      timeout: setTimeout(() => this.clearShowExcerpt(index), 500),
    });
  };

  hasMore = () => {
    const { numberToShow } = this.state;
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return numberToShow < posts.length;
  };

  loadMore = () => {
    const { numberToShow } = this.state;
    this.setState({ numberToShow: numberToShow + 3 });
  };

  renderPosts() {
    const { numberToShow, showExcerpt } = this.state;
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return _(posts)
      .take(numberToShow)
      .map(({ node: post }, index) => {
        const {
          id,
          frontmatter: {
            image,
            imageURL,
            // imageAlt,
            title,
            date,
            format,
          },
          fields: { slug },
          excerpt,
        } = post;
        const excerptClass = showExcerpt === index ? `active` : ``;

        return (
          <BlogPreviewContainer
            key={id}
            to={slug}
            onFocus={this.handleHover(index)}
            onMouseOver={this.handleHover(index)}
            onBlur={this.handleBlur(index)}
            onMouseLeave={this.handleBlur(index)}
            tabIndex="0"
          >
            <BlogPreviewImage bgImage={image || imageURL} index={index} />
            <PreviewTextContainer index={index}>
              <BlogType>{formatConverter[format]}</BlogType>
              <PreviewTitle index={index}>{title}</PreviewTitle>
              <DateText>{date}</DateText>
            </PreviewTextContainer>
            <ExcerptContainer className={excerptClass}>
              {excerpt}
            </ExcerptContainer>
          </BlogPreviewContainer>
        );
      })
      .value();
  }

  render() {
    return (
      <Layout>
        <BrandH1>Blog Posts</BrandH1>
        <BlogListGrid hasMore={this.hasMore()} loadMore={this.loadMore}>
          {this.renderPosts()}
        </BlogListGrid>
      </Layout>
    );
  }
}

BlogList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 1000
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
