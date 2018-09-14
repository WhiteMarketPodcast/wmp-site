import React, { Component } from 'react';
import { object } from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from 'components/Layout';

class TagsPage extends Component {
  static propTypes = { data: object.isRequired };

  render() {
    const {
      data: {
        allMarkdownRemark: { group },
        site: { siteMetadata },
      },
    } = this.props;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`Tags | ${siteMetadata.title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h1 className="title is-size-2 is-bold-light">Tags</h1>
                <ul className="taglist">
                  {group.map((tag) => (
                    <li key={tag.fieldValue}>
                      <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                        {`${tag.fieldValue} (${tag.totalCount})`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
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
