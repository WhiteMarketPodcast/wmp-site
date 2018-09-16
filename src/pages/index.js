import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import InfiniteScroll from 'react-infinite-scroller';
import Layout from 'components/Layout';
import Link from 'components/Link';
import {
  BlogPreviewContainer,
  BlogPreviewCard,
  BlogPreviewBG,
  LinkButton,
} from 'styles/components';

export default class IndexPage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }).isRequired,
  };

  state = {
    numberOfPosts: 4,
  };

  loadMore = () => {
    const { numberOfPosts } = this.state;
    this.setState({ numberOfPosts: numberOfPosts + 2 });
  };

  renderPosts() {
    const { numberOfPosts } = this.state;
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return _(posts)
      .take(numberOfPosts)
      .map(({ node: post }) => {
        const {
          id,
          frontmatter: {
            image,
            imageURL,
            // imageAlt,
            title,
            date,
          },
          fields: { slug },
          excerpt,
        } = post;
        return (
          <BlogPreviewContainer key={id}>
            <BlogPreviewBG
              style={{ backgroundImage: `url(${image || imageURL})` }}
            />
            <BlogPreviewCard>
              {/* <img src={image || imageURL} alt={imageAlt || ''} /> */}
              <h2>
                <Link to={slug}>{title}</Link>
              </h2>
              <small>{date}</small>
              <p>{excerpt}</p>
              <LinkButton to={slug}>Keep Reading →</LinkButton>
            </BlogPreviewCard>
          </BlogPreviewContainer>
        );
      })
      .value();
  }

  render() {
    const { numberOfPosts } = this.state;
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <InfiniteScroll
          hasMore={numberOfPosts < posts.length}
          loadMore={this.loadMore}
        >
          {this.renderPosts()}
        </InfiniteScroll>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
