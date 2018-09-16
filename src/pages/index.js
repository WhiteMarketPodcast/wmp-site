import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import Link from 'components/Link';
import { Card, CardBG, LinkButton, PaddedSection } from 'styles/components';

export default class IndexPage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }).isRequired,
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        {posts.map(({ node: post }) => {
          const {
            id,
            frontmatter: { image, imageURL, imageAlt, title, date },
            fields: { slug },
            excerpt,
          } = post;
          return (
            <CardBG style={{ backgroundImage: `url(${image || imageURL})` }}>
              <Card key={id}>
                {/* <img src={image || imageURL} alt={imageAlt || ''} /> */}
                <h2>
                  <Link to={slug}>{title}</Link>
                </h2>
                <small>{date}</small>
                <p>{excerpt}</p>
                <LinkButton to={slug}>Keep Reading →</LinkButton>
              </Card>
            </CardBG>
          );
        })}
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
      limit: 6
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
