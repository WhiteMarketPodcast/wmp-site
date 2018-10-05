import _ from 'lodash';
import React, { Component } from 'react';
import { object } from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import { PaddedSection } from 'style/components';
import { List, Item, TagLink } from 'style/components/tagsPage';

const getRemsFromCount = (count) => `${count * 0.05 + 0.8}rem`;

class TagsPage extends Component {
  static propTypes = { data: object.isRequired };

  renderTag = ({ fieldValue, totalCount: count }) => (
    <Item key={fieldValue}>
      <TagLink
        to={`/tags/${_.kebabCase(fieldValue)}/`}
        style={{
          fontSize: getRemsFromCount(count),
        }}
      >
        {`${fieldValue} (${count})`}
      </TagLink>
    </Item>
  );

  render() {
    const {
      data: {
        allMarkdownRemark: { group },
        site: { siteMetadata },
      },
    } = this.props;

    return (
      <Layout>
        <PaddedSection>
          <Helmet title={`Tags | ${siteMetadata.title}`} />
          <h1 className="text-center">Tags</h1>
          <List>
            {_(group)
              .sortBy(({ fieldValue }) => fieldValue.toLowerCase())
              .map(this.renderTag)
              .value()}
          </List>
        </PaddedSection>
      </Layout>
    );
  }
}

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
