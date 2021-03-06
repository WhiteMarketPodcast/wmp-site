import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import _ from 'lodash'
import { object } from 'prop-types'

import { BrandH1, PaddedSection } from 'style/components'
import { Item, List, TagLink } from 'style/components/tagsPage'

const getRemsFromCount = (count) => `${count * 0.05 + 0.8}rem`

class TagsPage extends Component {
  static propTypes = { data: object.isRequired }

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
  )

  render() {
    const {
      data: {
        allMarkdownRemark: { group },
        site: { siteMetadata },
      },
    } = this.props

    return (
      <>
        <PaddedSection>
          <Helmet title={`Tags | ${siteMetadata.title}`} />
          <BrandH1>Tags</BrandH1>
          <List>
            {_.sortBy(group, ({ fieldValue }) => fieldValue.toLowerCase()).map(
              this.renderTag,
            )}
          </List>
        </PaddedSection>
      </>
    )
  }
}

export default TagsPage

export const tagPageQuery = graphql`
  query TagsPage {
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
`
